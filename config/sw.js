export function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('_next/static/development/pages/index.js', { scope: '/_next/static/development/pages/' })
      .then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed: ', err)
      })
  }
}
