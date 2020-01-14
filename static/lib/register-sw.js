// const isProd = location.origin === 'https://www.dodoblog.cn'

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
  }
})
