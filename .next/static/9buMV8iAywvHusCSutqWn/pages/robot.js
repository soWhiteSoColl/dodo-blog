(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"79JR":function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return c}));var r=e("2w0b"),a=e.n(r),i=e("tkIX"),u=(e("UBOE"),a.a.createElement);function c(t){return u("div",{className:"robot-chat-head"},u("span",null,"\u5c0f\u5bd2"),u(i.a,null))}},"8EMx":function(t,n,e){"use strict";e.r(n);var r=e("r6tY"),a=e.n(r),i=e("u20+"),u=e.n(i),c=e("ZxvJ"),o=e.n(c),l=e("Ah5Y"),f=e.n(l),s=e("w2yW"),v=e.n(s),p=e("AkfJ"),h=e.n(p),d=e("CvBr"),b=e("2w0b"),m=e.n(b),g=e("Hcux"),y=e("Mudp"),j=e("l1Ty"),w=e("79JR"),O=e("1s8z"),x=e.n(O),N=e("+2Na"),E=e.n(N),k=(e("L6t4"),m.a.createElement);function M(t,n){var e=h()(t);if(v.a){var r=v()(t);n&&(r=r.filter((function(n){return f()(t,n).enumerable}))),e.push.apply(e,r)}return e}function C(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?M(Object(e),!0).forEach((function(n){Object(d.a)(t,n,e[n])})):o.a?u()(t,o()(e)):M(Object(e)).forEach((function(n){a()(t,n,f()(e,n))}))}return t}function T(t){var n=t.currentChat,e=t.initChat,r=t.clearChats,a=t.robotReply,i=t.getSelects;return Object(b.useEffect)((function(){var t=E.a.query.key||"default";return e(t),function(){return r()}}),[]),Object(b.useEffect)((function(){n&&("user"===n.role&&a(n.chatId),"robot"===n.role&&i(n.chatId))}),[n]),k(m.a.Fragment,null,k(x.a,null,k("title",null,"\u548c\u5c0f\u5bd2\u804a\u5929")),k("div",{className:"robot-page"},k("div",{className:"robot-panel"},k(w.default,null),k(y.default,null),k(j.default,null))))}T.getInitialProps=function(){return{navigator:!1}};n.default=Object(g.b)((function(t){return C({},t.robotModel)}),(function(t){return C({},t.robotModel)}))(T)},"9m3z":function(t,n,e){"use strict";e.r(n);var r=e("2w0b"),a=e.n(r),i=e("iczh"),u=e.n(i),c=(e("4c5X"),a.a.createElement);n.default=a.a.memo((function(t){var n=t.choose,e=t.onChange,a=t.visible,i=t.onCancel,o=Object(r.useState)(a),l=o[0],f=o[1];return Object(r.useEffect)((function(){var t;return a?f(!0):t=setTimeout((function(){return f(!1)}),250),function(){return clearTimeout(t)}}),[a]),l?c("div",{className:u()("robot-selects-panel",a?"show":"hidden")},c("div",{className:"selects-list"},n.map((function(t){return c("div",{key:t.label,className:"select-item",onClick:function(){return e(t.value)}},t.label)}))),c("div",{className:"selects-panel-mask",onClick:function(){return i()}})):null}))},"D+9D":function(t,n,e){t.exports=e("nseT")},DLjF:function(t,n,e){"use strict";var r=e("w2yW"),a=e.n(r),i=e("AkfJ"),u=e.n(i);function c(t,n){if(null==t)return{};var e,r,i=function(t,n){if(null==t)return{};var e,r,a={},i=u()(t);for(r=0;r<i.length;r++)e=i[r],n.indexOf(e)>=0||(a[e]=t[e]);return a}(t,n);if(a.a){var c=a()(t);for(r=0;r<c.length;r++)e=c[r],n.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(i[e]=t[e])}return i}e.d(n,"a",(function(){return c}))},LKoG:function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));var r=e("v8Qr"),a=e.n(r);function i(){return(i=a.a||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t}).apply(this,arguments)}},Mudp:function(t,n,e){"use strict";e.r(n);var r=e("r6tY"),a=e.n(r),i=e("u20+"),u=e.n(i),c=e("ZxvJ"),o=e.n(c),l=e("Ah5Y"),f=e.n(l),s=e("w2yW"),v=e.n(s),p=e("AkfJ"),h=e.n(p),d=e("CvBr"),b=e("2w0b"),m=e.n(b),g=e("iczh"),y=e.n(g),j=e("Hcux"),w=e("c22y"),O=(e("CBBb"),m.a.createElement);function x(t,n){var e=h()(t);if(v.a){var r=v()(t);n&&(r=r.filter((function(n){return f()(t,n).enumerable}))),e.push.apply(e,r)}return e}function N(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?x(Object(e),!0).forEach((function(n){Object(d.a)(t,n,e[n])})):o.a?u()(t,o()(e)):x(Object(e)).forEach((function(n){a()(t,n,f()(e,n))}))}return t}n.default=Object(j.b)((function(t){return N({},t.robotModel)}),(function(t){return N({},t.robotModel)}))((function(t){var n=t.chats,e=t.status,r=Object(b.useRef)(null),a=Object(b.useRef)(null);return Object(b.useEffect)((function(){var t;if(r&&a){var n=a.current.offsetHeight;t=setTimeout((function(){return r.current.scrollTo(0,n)}),0)}return function(){return clearTimeout(t)}}),[n]),O("div",{className:"chat-panel",ref:r},O("div",{className:"chat-list",ref:a},n.map((function(t,n){var e=t.content,r=t.role,a=t.id;if("string"!==typeof e&&!(e instanceof Array)&&"status"===e.type){var i=e.status;return O("div",{key:"".concat(a,"-").concat(n),className:y()("chat-status",i)},function(t){return{offline:"\u5bf9\u65b9\u5df2\u79bb\u7ebf",online:"\u5bf9\u65b9\u5df2\u4e0a\u7ebf"}[t]}(i))}return O("div",{key:a,className:y()("chat-item",r)},O("div",{className:"chat-content-wrapper"},O("div",{className:"chat-content"},function t(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(n.type){var r=n.type,a=n.src,i=void 0===a?"":a,u=n.text,c=void 0===u?"":u,o=n.href,l=void 0===o?"":o;if("img"===r)return O("img",{src:i,key:e});if("link"===r)return O("a",{href:l,key:e,target:"_new"},c);if("text"===r)return O("span",null,c);if("label"===r)return O("span",null,c)}if(n instanceof Array)return n.map((function(n,e){return t(n,e)}))}(e))))})),"inputing"===e&&O("div",{className:y()("chat-item robot","inputing"===e&&"expand")},O("div",{className:"chat-content-wrapper"},O("div",{className:"chat-content"},O(w.default,null))))))}))},c22y:function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return u}));var r=e("2w0b"),a=e.n(r),i=(e("KC0O"),a.a.createElement);function u(){return i("div",{className:"robot-chat-loading"},i("i",null),i("i",null),i("i",null),i("i",null),i("i",null))}},hiug:function(t,n,e){var r=e("NfTU"),a=e("j+Va");r(r.G+r.F*(parseInt!=a),{parseInt:a})},hy6D:function(t,n){t.exports="\t\n\v\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff"},"j+Va":function(t,n,e){var r=e("zoxk").parseInt,a=e("oRKG").trim,i=e("hy6D"),u=/^[-+]?0[xX]/;t.exports=8!==r(i+"08")||22!==r(i+"0x16")?function(t,n){var e=a(String(t),3);return r(e,n>>>0||(u.test(e)?16:10))}:r},l1Ty:function(t,n,e){"use strict";e.r(n);var r=e("r6tY"),a=e.n(r),i=e("u20+"),u=e.n(i),c=e("ZxvJ"),o=e.n(c),l=e("Ah5Y"),f=e.n(l),s=e("w2yW"),v=e.n(s),p=e("AkfJ"),h=e.n(p),d=e("CvBr"),b=e("2w0b"),m=e.n(b),g=e("Hcux"),y=e("9m3z"),j=(e("1Cjw"),m.a.createElement);function w(t,n){var e=h()(t);if(v.a){var r=v()(t);n&&(r=r.filter((function(n){return f()(t,n).enumerable}))),e.push.apply(e,r)}return e}function O(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?w(Object(e),!0).forEach((function(n){Object(d.a)(t,n,e[n])})):o.a?u()(t,o()(e)):w(Object(e)).forEach((function(n){a()(t,n,f()(e,n))}))}return t}n.default=Object(g.b)((function(t){return O({},t.robotModel)}),(function(t){return O({},t.robotModel)}))((function(t){var n=t.status,e=t.selects,r=t.userReply,a=Object(b.useState)(!1),i=a[0],u=a[1];return j(m.a.Fragment,null,"waiting"===n&&j("div",{className:"robot-input-area",onClick:function(){u(!0)}},"\u8bf7\u8f93\u5165..."),"waiting"!==n&&j("div",{className:"robot-info-area"},function(t){return{offline:"\u5c0f\u5bd2\u5df2\u79bb\u7ebf...",action:"\u5c0f\u5bd2\u64cd\u4f5c\u4e2d...",inputing:"\u5c0f\u5bd2\u6b63\u5728\u8f93\u5165\u4e2d..."}[t]}(n)),j(y.default,{choose:e,visible:i,onChange:function(t){r(t),u(!1)},onCancel:function(){u(!1)}}))}))},nseT:function(t,n,e){e("hiug"),t.exports=e("c01Q").parseInt},oRKG:function(t,n,e){var r=e("NfTU"),a=e("Si3G"),i=e("dqLm"),u=e("hy6D"),c="["+u+"]",o=RegExp("^"+c+c+"*"),l=RegExp(c+c+"*$"),f=function(t,n,e){var a={},c=i((function(){return!!u[t]()||"\u200b\x85"!="\u200b\x85"[t]()})),o=a[t]=c?n(s):u[t];e&&(a[e]=o),r(r.P+r.F*c,"String",a)},s=f.trim=function(t,n){return t=String(a(t)),1&n&&(t=t.replace(o,"")),2&n&&(t=t.replace(l,"")),t};t.exports=f},pZto:function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/robot",function(){return e("8EMx")}])},psj1:function(t,n,e){"use strict";e.d(n,"a",(function(){return u}));var r=e("r6tY"),a=e.n(r);function i(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),a()(t,r.key,r)}}function u(t,n,e){return n&&i(t.prototype,n),e&&i(t,e),t}},tkIX:function(t,n,e){"use strict";var r=e("D+9D"),a=e.n(r),i=e("2w0b"),u=e.n(i),c=e("joYR"),o=e.n(c),l=e("+2Na"),f=e.n(l),s=e("iczh"),v=e.n(s),p=e("LKoG"),h=e("DLjF"),d=e("CD3g"),b=e("psj1"),m=e("gtKq"),g=e("9xLo"),y=e("yl5b"),j=(e("yUkF"),u.a.createElement),w={pause:"M26 15 8 4 8 26 26 15 26 15",play:"M5 5 5 25 25 25 25 5 5 5","left-arrow":"M 20 5 10 15 20 25","right-arrow":"M 10 5 20 15 10 25","top-arrow":"M 5 20 15 10 25 20",menu:"M5 7 25 7  M5 15 25 15 M5 23 25 23",close:"M7 7 23 23 M15 15 15 15 M23 7 7 23",bars:"M5 25 5 15 M15 25 15 10 M25 25 25 5",search:"M24 22 A10 10 0 1 0 24 24 L26 26z"},O=function(t){function n(){return Object(d.a)(this,n),Object(m.a)(this,Object(g.a)(n).apply(this,arguments))}return Object(y.a)(n,t),Object(b.a)(n,[{key:"render",value:function(){var t=this.props,n=t.type,e=t.className,r=t.active,a=Object(h.a)(t,["type","className","active"]);return j("span",{className:v()("svg-icon-wrapper",e,r&&"active")},j("svg",Object(p.a)({},a,{className:v()("svg-icon",n&&"svg-icon-"+n)}),j("path",{d:w[n]})))}}]),n}(u.a.Component),x=e("rEMe");e("o/lk");e.d(n,"a",(function(){return k}));var N=u.a.createElement,E=[{text:"\u4e3b\u9875",href:"/home"},{text:"\u535a\u5ba2",href:"/"},{text:"\u7559\u8a00\u677f",href:"/contact"},{text:"\u548c\u5c0f\u5bd2\u804a\u5929",href:"/robot"}];function k(){var t=Object(i.useState)(!0),n=t[0],e=t[1],r=Object(i.useState)(!1),u=r[0],c=r[1],l=Object(i.useRef)(null),s=Object(i.useRef)(null),p=Object(i.useRef)({originTop:0,originLeft:0,originWidth:0,originHeight:0,maxRadius:0}),h=function(){if(console.log("calc"),l.current){var t=l.current,e=t.offsetTop,r=t.offsetLeft,i=t.offsetHeight,u=t.offsetWidth,c=window.screen,o=c.availWidth,f=c.availHeight;p.current={originTop:e-8,originLeft:r-8,originWidth:u+16,originHeight:i+16,maxRadius:a()(Math.sqrt(o*o+f*f).toString(),10)+10};var v=s.current;n&&(v.style.width=p.current.originWidth+"px",v.style.height=p.current.originHeight+"px",v.style.left=p.current.originLeft+"px",v.style.top=p.current.originTop+"px")}};return Object(i.useEffect)((function(){var t=Object(x.a)(h,300);return window.addEventListener("resize",t),f.a.events.on("routeChangeComplete",(function(){e(!0)})),function(){window.removeEventListener("resize",t)}}),[]),Object(i.useEffect)((function(){if(h(),s.current){var t=s.current,e=p.current.maxRadius,r=window.screen,a=r.availWidth,i=r.availHeight;n||(t.style.width=e+"px",t.style.height=e+"px",t.style.left=-1*(e-a)/2+"px",t.style.top=-1*(e-i)/2+"px",c(!0)),n&&setTimeout((function(){return c(!1)}),300)}}),[n]),N("div",{className:"navigator"},N("div",{ref:l,className:"navigator-collapsed-menu",onClick:function(){Object(x.c)("toggle-navigator","user-action",{collapsed:!n}),e(!n)}},N(O,{type:n?"menu":"close"})),N("div",{ref:s,className:v()("navigator-panel",n?"hidden":"show")}),u&&N("div",{className:v()("navigator-links",n?"hidden":"show")},E.map((function(t){return N(o.a,{key:t.href,href:t.href},N("a",null,t.text))}))))}}},[["pZto",1,0,2]]]);