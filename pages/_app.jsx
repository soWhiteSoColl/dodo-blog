import React from 'react'
import App, { Container } from 'next/app'
import { Provider, observer, inject } from 'mobx-react'
import Router from 'next/router'
import NProgress from 'nprogress'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Player from '../components/Player'
import ToTop from '../components/ToTop'
import store from '../store'
import '../styles/index.less'
import 'dodoui/lib/dodo.css'


export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let initialProps = {}
    if (Component.getInitialProps) {
      initialProps = await Component.getInitialProps(ctx, store)
    }
    return { initialProps }
  }

  componentDidMount() {
    Router.onRouteChangeStart = () => NProgress.start()
    Router.onRouteChangeComplete = () => NProgress.done()
    Router.onRouteChangeError = () => NProgress.done()

    store.contactStore.getNickName()
    store.contactStore.saveView()

    let title = document.title
    window.addEventListener('focus', () => {
      document.title = '(๑>ω<๑) 又好了耶。。。'
      setTimeout(() => {
        document.title = title
      }, 2000)
    })
    window.addEventListener('blur', () => {
      title = document.title
      document.title = '(ÒωÓױ) 页面崩溃了！！！'
    })
  }


  render() {
    const { Component, initialProps } = this.props
    const ObserverComponent = inject(store => store)(observer(Component))

    const {
      header: hasHeader = true,
      footer: hasFooter = true,
      audio: hasAudio = true,
      toTop: hasToTop = true,
      audioConfig = {}
    } = initialProps

    return (
      <Container>
        <Provider {...store}>
          <div id="app">
            {hasHeader && <Header />}
            <div className="main-content">
              <ObserverComponent {...initialProps} />
            </div>
            {hasAudio && <Player audioConfig={audioConfig} />}
            {hasFooter && <Footer />}
            {hasToTop && <ToTop />}
          </div>
        </Provider>
      </Container>
    )
  }
}