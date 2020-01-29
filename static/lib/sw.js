/* eslint-disable */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.3.0/workbox-sw.js'
)

function configWorkbox() {
  workbox.setConfig({ debug: false })

  workbox.core.setCacheNameDetails({
    prefix: 'my-app',
    suffix: 'v1',
    precache: 'dodo-precache',
    runtime: 'dodo-runtime',
  })

  const { StaleWhileRevalidate, CacheFirst, NetworkFirst } = workbox.strategies

  workbox.routing.registerRoute(
    '/',
    new NetworkFirst({ cacheName: 'html-cache' })
  )

  workbox.routing.registerRoute(
    '/home',
    new NetworkFirst({ cacheName: 'html-cache' })
  )

  workbox.routing.registerRoute(
    /\/blog\?id=.*/,
    new NetworkFirst({ cacheName: 'html-cache' })
  )

  workbox.routing.registerRoute(
    /\.js$/,
    new StaleWhileRevalidate({ cacheName: 'js-cache' })
  )

  workbox.routing.registerRoute(
    /\.css$/,
    new StaleWhileRevalidate({ cacheName: 'css-cache' })
  )

  workbox.routing.registerRoute(
    ({ url }) => url.pathname && /\/api\/.*/.test(url.pathname),
    new NetworkFirst({ cacheName: 'api-cache' })
  )

  workbox.routing.registerRoute(
    /\/api/,
    new NetworkFirst({ cacheName: 'api-cache' })
  )

  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
    new CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    })
  )
}

if (workbox) {
  configWorkbox()

  console.log('Yay! Workbox is loaded 🎉')
} else {
  console.log("Boo! Workbox didn't load 😬")
}
