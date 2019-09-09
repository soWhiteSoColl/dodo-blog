/**
 * google analytics
 */
const gaScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-145391362-1');`

function appendScript(str, cb) {
  const scriptTag = document.createElement('script')
  scriptTag.innerHTML = str
  document.body.appendChild(scriptTag)
  cb && cb()
}

export default function initBI() {
  appendScript(gaScript)
}
