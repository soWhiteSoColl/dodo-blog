import React from 'react'
import App, { Container } from 'next/app'
import { Provider, observer, inject } from 'mobx-react'
import Router from 'next/router'
import NProgress from 'nprogress'
import Header from 'components/Header'
import ToTop from 'ui/ToTop'
import stores from '../stores'
import initBI from '../config/bi'

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let initialProps = {}

    if (Component.getInitialProps) {
      initialProps = await Component.getInitialProps(ctx, stores)
    }

    return { initialProps }
  }

  async componentDidMount() {
    Router.onRouteChangeStart = () => NProgress.start()
    Router.onRouteChangeComplete = () => NProgress.done()
    Router.onRouteChangeError = () => NProgress.done()

    let recoverTitleTimer = null

    window.addEventListener('focus', () => {
      const title = document.getElementById('just_for_fun_title')
      if (title) {
        title.innerHTML = '(๑>ω<๑) 又好了耶。。。'
        recoverTitleTimer = setTimeout(
          () => title && document.head.contains(title) && document.head.removeChild(title),
          2000
        )
      }
    })

    window.addEventListener('blur', () => {
      clearTimeout(recoverTitleTimer)
      let title = document.getElementById('just_for_fun_title')
      if (!title) {
        title = document.createElement('title')
        title.id = 'just_for_fun_title'
        document.head.insertBefore(title, document.head.firstChild)
      }
      title.innerHTML = '(ÒωÓױ) 页面崩溃了！！！'
    })

    if (localStorage.getItem('user-jwt')) {
      stores.userStore
        .getInfo()
        .then(stores.userStore.saveViewRecord)
        .catch(stores.userStore.saveViewRecord)
    } else {
      stores.userStore.saveViewRecord()
    }

    initBI()
  }

  render() {
    const { Component, initialProps } = this.props
    const ObserverComponent = inject(stores => stores)(observer(Component))

    const {
      header: hasHeader = true,
      toTop: hasToTop = true,
    } = initialProps

    return (
      <Container>
        <Provider {...stores}>
          <div id="app">
            {hasHeader && <Header />}
            <div className="main-content">
              <ObserverComponent {...initialProps} />
              {hasToTop && <ToTop />}
            </div>
          </div>
        </Provider>
      </Container>
    )
  }
}
