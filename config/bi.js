/**
 * google analytics
 */
const gaScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-145391362-1');`

function appendScript(str) {
  const scriptTag = document.createElement('script')
  scriptTag.innerHTML = str
  document.body.appendChild(scriptTag)
}


const ptScript = `
window._pt_lt = new Date().getTime();
window._pt_sp_2 = [];
_pt_sp_2.push("setAccount,26c1d230");
var _protocol =(("https:" == document.location.protocol) ? " https://" : " http://");
(function() {
  var atag = document.createElement("script");
  atag.type = "text/javascript";
  atag.async = true;
  atag.src = _protocol + "js.ptengine.cn/26c1d230.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(atag, s);
})();
`

const gioScript = `
!function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement("script"),tag=t.getElementsByTagName("script")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,"script","assets.giocdn.com/2.1/gio.js","gio");
  gio('init','aad0d8d52b4cb741', {});

//custom page code begin here

//custom page code end here

gio('send');
`

export default function initBI() {
  appendScript(gaScript)
  appendScript(ptScript)
  appendScript(gioScript)
}
