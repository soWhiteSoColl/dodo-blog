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

/**
 * ptengine
 */
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

/**
 * growingio
 */
const gioScript = `
!function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement("script"),tag=t.getElementsByTagName("script")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,"script","assets.giocdn.com/2.1/gio.js","gio");
  gio('init','aad0d8d52b4cb741', {});

//custom page code begin here

//custom page code end here

gio('send');
`

/**
 * zhugeio
 */
const zgScript = `
(function() {
  if (window.zhuge) return;
  window.zhuge = [];
  window.zhuge.methods = "_init identify track getDid getSid getKey setSuperProperty setUserProperties setWxProperties setPlatform".split(" ");
  window.zhuge.factory = function(b) {
    return function() {
      var a = Array.prototype.slice.call(arguments);
      a.unshift(b);
      window.zhuge.push(a);
      return window.zhuge;
    }
  };
  for (var i = 0; i < window.zhuge.methods.length; i++) {
    var key = window.zhuge.methods[i];
    window.zhuge[key] = window.zhuge.factory(key);
  }
  window.zhuge.load = function(b, x) {
    if (!document.getElementById("zhuge-js")) {
      var a = document.createElement("script");
      var verDate = new Date();
      var verStr = verDate.getFullYear().toString() + verDate.getMonth().toString() + verDate.getDate().toString();

      a.type = "text/javascript";
      a.id = "zhuge-js";
      a.async = !0;
      a.src = 'https://zgsdk.zhugeio.com/zhuge.min.js?v=' + verStr;
      a.onerror = function() {
        window.zhuge.identify = window.zhuge.track = function(ename, props, callback) {
          if(callback && Object.prototype.toString.call(callback) === '[object Function]') {
            callback();
          } else if (Object.prototype.toString.call(props) === '[object Function]') {
            props();
          }
        };
      };
      var c = document.getElementsByTagName("script")[0];
      c.parentNode.insertBefore(a, c);
      window.zhuge._init(b, x)
    }
  };
  window.zhuge.load('6558a2e1138345d19e6c6f5f9ae8434c', { //配置应用的AppKey
    superProperty: { //全局的事件属性(选填)
      '应用名称': '诸葛io'
    },
    adTrack: false,//广告监测开关，默认为false
    autoTrack: false,
    //启用全埋点采集（选填，默认false）
    singlePage: false //是否是单页面应用（SPA），启用autoTrack后生效（选填，默认false）
  });
})();
`


/**
 * hotjar
 */
const hotjarScript = `
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:1437851,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`

export default function initBI() {
  appendScript(gaScript)
  appendScript(ptScript)
  appendScript(gioScript)
  appendScript(zgScript)
  appendScript(hotjarScript)
}
