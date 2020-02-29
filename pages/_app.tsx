import React, { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Provider } from 'react-redux'
import Navigator from '../components/Navigator'
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

  const { navigator = true } = pageProps
  return (
    <>
      <Head>
        <title>小寒的博客</title>
      </Head>
      <Provider store={store}>
        {navigator && <Navigator />}
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
