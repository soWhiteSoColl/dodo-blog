/* eslint-disable */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

function configWorkbox() {
  const { StaleWhileRevalidate, CacheFirst } = new workbox.strategies

  workbox.core.setCacheNameDetails({
    prefix: 'my-app',
    suffix: 'v1',
    precache: 'dodo-precache',
    runtime: 'dodo-runtime',
  });

  // 缓存所有博客html页面
  workbox.routing.registerRoute('/', new StaleWhileRevalidate({ cacheName: 'html-cache' }))

  workbox.routing.registerRoute('/home', new StaleWhileRevalidate({ cacheName: 'html-cache' }))

  workbox.routing.registerRoute(/\/blog\?id=.*/, new StaleWhileRevalidate({ cacheName: 'html-cache' }))

  workbox.routing.registerRoute(/\.js$/, new StaleWhileRevalidate({ cacheName: 'js-cache' }))

  // 缓存css
  workbox.routing.registerRoute(/\.css$/, new StaleWhileRevalidate({ cacheName: 'css-cache' }))

  // 缓存图片
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
    new CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );

  workbox.setConfig({ debug: false })
}

if (workbox) {
  configWorkbox()

  console.log('Yay! Workbox is loaded 🎉')
} else {
  console.log('Boo! Workbox didn\'t load 😬')
}