import React from 'react'
import App, { Container } from 'next/app'
import { Provider, observer, inject } from 'mobx-react'
import Router from 'next/router'
import NProgress from 'nprogress'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MusicPlayer from '../components/widgets/MusicPlayer'
import configConst from '../config'
import store from '../store'
import '../styles/index.less'
import 'dodoui/lib/dodo.css'
import { toJS } from 'mobx'

@inject('musicStore')
@observer
class AudioPlayer extends React.Component {
  componentDidMount() {
    const id = localStorage.getItem('current-list-id') || configConst.defaultMusicListId
    !this.props.musicStore.currentList || !this.props.musicStore.currentList.songs
      && this.props.musicStore.getListById(id)
  }

  render() {
    if (!this.props.musicStore.currentList || !this.props.musicStore.currentList.songs) {
      return null
    }

    return (
      <MusicPlayer
        getAudio={audio => {
          store.musicStore.setValue('audio', audio)
        }}
        audioConfig={this.props.audioConfig}
        musics={store.musicStore.currentList.songs}
        onPlay={store.musicStore.toggle}
      />
    )
  }
}

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

    store.contactStore.saveView()
  }


  render() {
    const { Component, initialProps } = this.props
    const ObserverComponent = inject(store => store)(observer(Component))

    const {
      header: hasHeader = true,
      footer: hasFooter = true,
      audio: hasAudio = true,
      audioConfig = {}
    } = initialProps

    return (
      <Container>
        <Provider {...store}>
          <>
            {hasHeader && <Header />}
            <div className="main-content">
              <ObserverComponent {...initialProps} />
            </div>
            {hasAudio && <AudioPlayer audioConfig={audioConfig} />}
            {hasFooter && <Footer />}
          </>
        </Provider>
      </Container>
    )
  }
}