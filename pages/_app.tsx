import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Provider } from 'react-redux'
import store from '../store'
import '../configs/axios'
import '../styles/index.scss'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return (
    <>
      <Head>
        <title>小寒的博客-用心创作</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
