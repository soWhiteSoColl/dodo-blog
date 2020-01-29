const isProd = location.origin === 'https://www.dodoblog.cn'
// const isProd = true

window.addEventListener('load', () => {
  if (isProd && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  }
})
