import React, { useEffect } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Provider } from 'react-redux'
import store from '../store'
import '../configs/axios'
import '../styles/index.scss'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
