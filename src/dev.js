!function(){var e=[".app-phone"],t="",n=!1;var r=0,o={},i={},s=/(import\s+([^"')]+\s+from\s)?['"])([^"')]+)(['"]\s?[\;|\n])/gi,u=/(import\s+['"])([^"')]+)(['"]\s?[\;|\n])/gi,a=/((?:(?:^[ \t]*)?(?:\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\/(?:[ \t]*\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/)))?|\/\/(?:[^\\]|\\(?:\r?\n)?)*?(?:\r?\n(?=[ \t]*(?:\r?\n|\/\*|\/\/))|(?=\r?\n))))+)|("(?:\\[\S\s]|[^"\\])*"|'(?:\\[\S\s]|[^'\\])*'|(?:\r?\n|[\S\s])[^\/"'\\\s]*)/gm;function c(e){return e.replace(a,"$2")}function l(e){return/^(http:\/\/|https:\/\/|\/\/)/i.test(e)}function f(e,n){var r=e[0];return"@"===r?t+e.substr(1).replace(/^\//g,""):"~"===r?t+"../node_modules/"+e.substr(1).replace(/^\//g,""):"."===r?p(n,e):e}function p(e,t){var n=e.split("/"),r=t.split("/");n.pop();for(var o=0;o<r.length;o++)"."!=r[o]&&(".."==r[o]?n.pop():n.push(r[o]));return n.join("/")}function d(e){var t=new Headers;return t.append("pragma","no-cache"),t.append("cache-control","no-cache"),fetch(e,{headers:t}).then(function(t){if(200!==t.status)throw"resolve import["+e+"] failed";return t.text()}).then(function(t){var n=e.split("/");return n.pop(),w(t,n=n.join("/")+"/")})}function h(e){return d(e).then(function(e){return import(e).then(function(e){return e.default})})}function m(e){return d(e).then(function(t){return i[e]=t,t})}function v(e){if(!(e in o))return!1;var t=o[e],n="";t.url&&(n+="import s from '"+t.url+"';\n"),t.template&&(n+="s.template = "+JSON.stringify(t.template)+";\n"),n+="export default s;";var r=new Blob([n],{type:"text/javascript"}),s=URL.createObjectURL(r);return delete o[e],i[e]=s,s}function y(e){return L(e).then(function(){var t=v(e);if(!t)throw"resolve "+e+" failed";return t})}function g(e,t){var n=p(t,e),r=function(e){return e in i&&Promise.resolve(i[e])}(n);return r||((r=v(n))||function(e){var t=e.toLowerCase();return t.endsWith(".js")||t.endsWith(".mjs")?m(e):t.endsWith(".vue")?y(e):y(e+".vue").catch(function(){return m(e+".js")})}(n))}function b(e,t){"__lib_loaded__"in window||(window.__lib_loaded__=[]),t=t&&t.hasOwnProperty("default")?t.default:t;var n=__lib_loaded__.push(t)-1;return"let "+e.substr(0,e.length-"from".length)+" = __lib_loaded__["+n+"]"}function x(e){return URL.createObjectURL(new Blob([e],{type:"text/javascript"}))}function w(e,t){var n=0,r=[];if(e=c(e).replace(s,function(e,t,o,i,s){var u="__$VUE_IMPORT_MODULE_"+n+"__";return r.push({index:n,src:i,extra:o?o.trim():null,code:t+"{~src~}"+s}),n++,u}),0===n)return Promise.resolve(x(e));var o=[],i=[];return r.forEach(function(e){var n,r=e.index,s=e.src,u=e.extra,a=e.code;n=s.indexOf("!")>-1||l(s)||-1===s.indexOf("/")?new Promise(function(e,t){require([s],function(t){u?o.push({index:r,url:b(u,t)}):o.push({index:r,url:""}),e(t)},function(){t("load global ["+s+"] failed")})}):g(s,t).then(function(e){o.push({index:r,url:a.replace("{~src~}",e)})}),i.push(n)}),Promise.all(i).then(function(t){return o.forEach(function(t){var n=t.index,r=t.url;e=e.replace("__$VUE_IMPORT_MODULE_"+n+"__",r)}),x(e)})}var E=function(){this.code=null,this.text=null,this.headers={},this.payload=null};E.prototype.status=function(e,t){return this.code=e,this.text=t,this},E.prototype.header=function(e,t){return"object"==typeof e?this.headers=Object.assign({},this.headers,e):this.headers[e]=t,this},E.prototype.send=function(e){return this.payload=e,this};var _={},O=!1;function j(e){return Object.entries(e).forEach(function(e){var t,n=e[0],r=e[1],o=n.split(" ").filter(function(e){return e}).slice(0,2),i=o.length>1?o[0].toUpperCase():"_",s=o.length>1?o[1]:o[0];i in _||(_[i]={}),_[i][l(s)?s:(t=s,"/"+t.replace(/([^:]\/)\/+/g,"$1").replace(/^\//g,""))]=r}),_}function T(e,t,n){var r={};t&&(t.code&&(r.status=t.code),t.text&&(r.statusText=t.text),t.headers&&(r.headers=t.headers));var o=new Response(JSON.stringify(e),r);return"number"!=typeof n||n<1?o:new Promise(function(e){setTimeout(function(){e(o)},n)})}var S=function(e){this.code=e};S.prototype.compile=function(){if(n)return Promise.resolve();var e=new Blob([this.code],{type:"text/javascript"});return h(URL.createObjectURL(e)).then(function(e){return j(e)})};var P=function(e,t){this.component=e,this.content=t,this.import=null};P.prototype.compile=function(){return w(this.content,this.component.baseURI).then(function(e){return this.import=e,this}.bind(this))};var R=function(e,t){this.component=e,this.content=t};R.prototype.compile=function(){var e=this;return Object.entries({video:["src","poster"],source:"src",img:"src",image:["xlink:href","href"],use:["xlink:href","href"]}).forEach(function(t){var n=t[0],r=t[1];Array.isArray(r)?r.forEach(function(t){e.assetUrl(n,t)}):e.assetUrl(n,r)}),Promise.resolve()},R.prototype.assetUrl=function(e,t){var n=this.component.baseURI,r=new RegExp("(<"+e+".+"+t+"=s*['\"]?)([^\"']+)([\"']?.+>)","gi");this.content=this.content.replace(r,function(e,t,r,o){return t+f(r,n)+o})};var U=[/(url\(\s*['"]?)([^"')]+)(["']?\s*\))/g,/(AlphaImageLoader\(\s*src=['"]?)([^"')]+)(["'])/g],k=function(e,t,n,r){this.component=e,this.content=t,this.scoped=n,this.less=r};k.prototype.compile=function(){var e=this;return new Promise(function(t){if(!e.less)return t(e.content);require(["less.browser"],function(n){var r=e.component.baseURI,o=c(e.content).replace(u,function(e,t,n,o){return t+f(n,r)+o});n.render(o,function(n,r){if(n)throw n.message+" @["+e.component.sfcUrl+"]";t(r.css)})})}).then(function(t){return e.parse(t)})},k.prototype.parse=function(e){var t=this.component.baseURI;U.forEach(function(n){e=e.replace(n,function(e,n,r,o){return n+f(r,t)+o})}),this.content=e;var n=document.createElement("style");n.appendChild(document.createTextNode(e)),this.component.getHead().appendChild(n),this.scoped&&this.scopeStyles(n,"["+this.component._scopeId+"]")},k.prototype.scopeStyles=function(t,n){function r(){for(var r=t.sheet,o=r.cssRules,i=0;i<o.length;++i){var s=o[i];if(1===s.type){var u=[];s.selectorText.split(/\s*,\s*/).forEach(function(t){var r=t.match(/([^ :]+)(.+)?/);r[1]&&e.includes(r[1])?u.push(r[1]+" "+n+r[2]):u.push(n+" "+t)});var a=u.join(",")+s.cssText.substr(s.selectorText.length);r.deleteRule(i),r.insertRule(a,i)}}}try{r()}catch(e){if(e instanceof DOMException&&e.code===DOMException.INVALID_ACCESS_ERR)return t.sheet.disabled=!0,void t.addEventListener("load",function e(){t.removeEventListener("load",e),setTimeout(function(){r(),t.sheet.disabled=!1})});throw e}};var A=function(e){this.name=e,this.template=null,this.script=null,this.mock=null,this.styles=[],this.baseURI="",this.sfcUrl="",this._scopeId="data-s-"+(r++).toString(36)};function L(e){var t=e.match(/(.*?)([^/]+?)\/?(\.vue)?(\?.*|#.*|$)/),n=t[2];return e=t[1]+t[2]+(void 0===t[3]?"/index.vue":t[3])+t[4],new A(n).load(e).then(function(e){return e.compile()}).then(function(t){var r=t.script?t.script.import:null,i=t.template?t.template.content:null;if(o[e]={name:n,url:r,template:i},r)return import(r).then(function(e){var n=e.default;return void 0===n.name&&void 0!==t.name&&(n.name=t.name),i&&(n.template=i),n});var s={};return void 0!==t.name&&(s.name=t.name),i&&(s.template=i),s})}function I(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}A.prototype.getHead=function(){return document.head||document.getElementsByTagName("head")[0]},A.prototype.load=function(e){var t=new Headers;return t.append("pragma","no-cache"),t.append("cache-control","no-cache"),fetch(e,{headers:t}).then(function(t){if(200!==t.status){var n=new Error("resolve "+e+" failed");throw n.code=404,n}return t.text()}).then(function(t){var n,r,o;this.sfcUrl=e,this.baseURI=e.substr(0,e.lastIndexOf("/")+1);for(var i,s,u,a=/<script([^>]+)?>([\s\S]*?)<\/script>/im;n=a.exec(t);)n[1]&&n[1].indexOf("mock")>-1?r=n[2]:o=n[2],t=t.substr(0,n.index)+t.substr(n.index+n[0].length);o&&(this.script=new P(this,o)),r&&(this.mock=new S(r));for(var c=/<style([^>]+)?>([\s\S]*?)<\/style>/gim;null!==(n=c.exec(t));)i=s=!1,n[1]&&(i=n[1].indexOf("scoped")>-1,s=n[1].indexOf("less")>-1),i&&!u&&(u=!0),this.styles.push(new k(this,n[2],i,s));if(n=t.match(/<template([^>]+)?>([\s\S]*)<\/template>/i)){var l,f=!u&&n[2].match(/<[^>]+>/i);l=f&&-1===f[0].indexOf("v-if")?f[0].substr(0,f[0].length-1)+" "+this._scopeId+">"+n[2].substr(f.index+f[0].length):"<span "+this._scopeId+">"+n[2]+"</span>",this.template=new R(this,l)}return this}.bind(this))},A.prototype.compile=function(){return Promise.all(Array.prototype.concat(this.script&&this.script.compile(),this.mock&&this.mock.compile(),this.template&&this.template.compile(),this.styles.map(function(e){return e.compile()}))).then(function(){return this}.bind(this))};var M=document,C=M.head||M.getElementsByTagName("head")[0]||M.documentElement,N=C.getElementsByTagName("base")[0],q="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function B(e){N?C.insertBefore(e,N):C.appendChild(e)}function $(e){return/^(http:\/\/|https:\/\/|\/\/)/i.test(e)}function z(e,t){return e.replace(/\/$/g,"")+(t?"/":"")}function W(e){return"/"+e.replace(/([^:]\/)\/+/g,"$1").replace(/^\//g,"")}function D(e){var t=[];return e.split("#").forEach(function(e){""!==(e=e.trim())&&t.push(z(e))}),t}String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{value:function(e,t){var n=t>0?0|t:0;return this.substring(n,n+e.length)===e}}),Object.entries||(Object.entries=function(e){for(var t=Object.keys(e),n=t.length,r=new Array(n);n--;)r[n]=[t[n],e[t[n]]];return r});var F=!1,V="/",H="hash",J="",G={},K=function(){for(var e,t,n=M.getElementsByTagName("script"),r=n.length,o=0,i=void 0,s=void 0;o<r;o++)if(s=(i=n[o]).getAttribute("data-main")){e=s,(s=i.getAttribute("base-url"))&&(t=s),(s=i.getAttribute("api-url"))&&(V=s.replace(/\/$/g,"")),(s=i.getAttribute("router-mode"))&&(H=s),(s=i.getAttribute("extend-url"))&&(J=s);for(var u=void 0,a=0,c=i.attributes,l=c.length;a<l;a++)"vuex"!==(u=c[a]).nodeName?u.nodeName.startsWith("vue-")&&(G[u.nodeName.substr(4)]=D(u.nodeValue)):F=!0;break}var f=document.createElement("a");if(f.href=V,V=z(f.href),!t){var p=e.split("/");p.pop(),t=p.join("/")}return f.href=t,z(f.href,!0)}(),Q={};define("vue.utils",[],{m:K,n:function(e,t,n,r,o,i,s,u){var a="function"==typeof n?n.options:n;if(e&&e.render&&(a.render=e.render,a.staticRenderFns=e.staticRenderFns,a._compiled=!0,o&&(a.functional=!0)),r&&(a._scopeId=r),t){var c=function(e){t.call(this,u(e))};if(a.functional){var l=a.render;a.render=function(e,t){return c.call(t),l(e,t)}}else{var f=a.beforeCreate;a.beforeCreate=f?[].concat(f,c):[c]}}return n},c:function(e){return function(e,t){return function(e,t){var n=q?t.media||"default":e,r=Q[n]||(Q[n]={ids:new Set,styles:[]});if(!r.ids.has(e)){r.ids.add(e);var o=t.source;if(r.element||(r.element=M.createElement("style"),r.element.type="text/css",t.media&&r.element.setAttribute("media",t.media),B(r.element)),"styleSheet"in r.element)r.styles.push(o),r.element.styleSheet.cssText=r.styles.filter(Boolean).join("\n");else{var i=r.ids.size-1,s=M.createTextNode(o),u=r.element.childNodes;u[i]&&r.element.removeChild(u[i]),u.length?r.element.insertBefore(s,u[i]):r.element.appendChild(s)}}}(e,t)}}});var X=null,Y=null,Z=null;function ee(e,t,n){if(e=e.trim()){var r=e.indexOf("!");if(-1!==r){var o=e.substr(0,r);if(o in G){var i=e.substr(r+1);if((o=G[o]).length>1)return te(o.map(function(e){return(""==e?K:e+"/")+i}),t);e=(""==o[0]?K:o[0]+"/")+i}}var s=M.createElement("link");null===X&&(Y=!(X="onload"in s)&&"onreadystatechange"in s,Z="onerror"in s),X?s.onload=function(){t()}:Y?s.onreadystatechange=function(){/loaded|complete/.test(s.readyState)&&t()}:t(),Z&&(s.onerror=function(){C.removeChild(s),n()}),s.rel="stylesheet",s.href=e+".css",s.crossOrigin="",B(s)}else n()}function te(e,t){var n=Array.isArray(e)?1===e.length?e[0]:null:e;if(n)return ee(n,function(){t(!0)},function(){t(!1)});e.length?ee(e.shift(),function(){t(!0)},function(){te(e,t)}):t(!1)}function ne(e){var t=e.indexOf("?");return t>-1?e.substr(0,t):e}function re(e,t){t&&("install"in t&&"function"==typeof t.install?e.use(t):"default"in t&&"install"in t.default&&"function"==typeof t.default.install?e.use(t.default):"name"in t&&"string"==typeof t.name&&"render"in t&&"function"==typeof t.render&&e.component(t.name,t))}define("css",{normalize:ne,load:function(e,t,n,r){te(e.split("#").filter(Boolean),n)}}),define("name",{normalize:ne,load:function(e,t,n,r){var o,i,s=e,u=s.indexOf(":");-1!==u&&("http"===(o=s.substr(0,u).trim())||"https"===o?o=null:s=s.substr(u+1).trim());var a=s.indexOf(";");-1!==a&&(i=s.substr(a+1).trim(),s=s.substr(0,a).trim());var c=function(e){i&&define(i,[],function(){return e}),n(e)};t([s],function(e){o?t([o],c):c(e)})}}),define("last",{normalize:ne,load:function(e,t,n,r){var o=e.split(","),i=function(e){var r=o.shift();(r=r?r.trim():null)?t([r],i):n(e)};i()}});var oe,ie,se,ue,ae="";var ce=function(e){ue=e},le=function(e){var t=new Error("can't load["+e+"]");return t.code=404,Promise.reject(t)};var fe={render:function(e){return e("div",{},["Error - "+this.code])}};var pe="",de="",he=null,me=null,ve=0,ye=!1,ge=null;function be(e){if(!1===ye)return!1;var t=ye;return 1!==t&&(e||(e=t>=0&&t<.2?.1:t>=.2&&t<.5?.04:t>=.5&&t<.8?.02:t>=.8&&t<.99?.005:0),(t=Math.min(.994,Math.max(0,t+e)))>.99&&t<.994&&(t=.994),ye=t),t=100*(-1+ye),"margin"===he?de.style.marginLeft=t+"%":(de.style.transform="translate3d"===he?"translate3d("+t+"%,0,0)":"translate("+t+"%,0)",de.style.transition="all 200ms linear"),ye<.994}function xe(){be()&&setTimeout(xe,200)}function we(){!function(){if(""===de){var e=M.getElementById("progress-wrap"),t=M.getElementById("progress-bar");if(e&&t){e.style.display="none",pe=e,de=t;var n=M.body.style;he=(me="WebkitTransform"in n?"Webkit":"MozTransform"in n?"Moz":"msTransform"in n?"ms":"OTransform"in n?"O":"")+"Perspective"in n?"translate3d":me+"Transform"in n?"translate":"margin"}else pe=null}}(),pe&&(ve++,!1===ye&&(ge&&(clearTimeout(ge),ge=null),ye=0,xe(),pe.style.display="block"))}function Ee(){--ve>0||(be(.3+.5*Math.random()),ye=1,be(),ye=!1,ge=setTimeout(function(){pe.style.display="none"},300))}var _e,Oe,je,Te,Se,Pe={400:"请求数据不正确",401:"您还未登录或登录过期",403:"您无权执行该操作",404:"您执行的操作不存在",500:"服务器出错了",502:"网关发生错误",503:"服务器过载或正在维护",504:"请求网关超时",600:"请求发生错误"},Re=function(e,t){this.code=0,this.message=null,this.resJson=t,this.response=e};function Ue(e){return function(e){return n?fetch(e):new Promise(function(e){return O?e(_):h("../mock.js").catch(function(){return{}}).then(function(t){return O=!0,j(t),e(_)})}).then(function(t){return{data:t,url:e._url.split("#")[0].split("?")[0],request:e}}).then(function(e){var t=e.data,n=e.url,r=e.request,o=r.method,i=o in t&&n in t[o]?t[o][n]:"_"in t&&n in t._?t._[n]:null;if(!i)return fetch(r);var s=i,u=0;if(Array.isArray(s)&&2===s.length&&"number"==typeof s[1]&&(u=s[1],s=s[0]),"function"!=typeof s)return T(s,null,u);var a=new E;return Promise.resolve(s(r,a)).then(function(){return T(a.payload,a,u)})})}(e)}function ke(e,t,n,r,o){var i=new Error(t);throw i.code=e,i.request=n,i.response=r,i.error=o,i}function Ae(e,t,n){var r=t||{},o=r.mode,i=r.credentials,s=r.url,u=I(r,["mode","credentials","url"]);o||""===ae||"none"===ae||(u.mode=ae,i||(u.credentials="include"));var a,c=e instanceof Request;if(u.body){var l=(u.method?u.method:c?e.method:"").toUpperCase(),f=""===l;(f||"POST"===l||"PUT"===l||"DELETE"===l)&&("string"==typeof u.body||u.body instanceof FormData||(u.body=JSON.stringify(u.body)),f&&(u.method="POST"))}c?a=s&&s!==e.url?function(e,t,n){var r={};return["method","headers","body","mode","credentials","cache","redirect","referrer","integrity","referrerPolicy","destination"].forEach(function(t){r[t]=n&&t in n?n[t]:e[t]}),new Request(t,r)}(e,$(s)?s:V+W(s),u):new Request(e,u):(e=s||e,a=new Request($(e)?e:V+W(e),u)),s||(s=c?e.url:e);var p=$(s)?s.startsWith(V)?s.substr(V.length):null:s;return a._url=p?W(p):s,n&&!a.headers.has("Accept")&&a.headers.set("Accept","application/json"),a}function Le(e,t,n){we();var r=t||{},o=r.guard;void 0===o&&(o=!0);var i=r.handleError;void 0===i&&(i=!0);var s=r.alertError;void 0===s&&(s=null);var u=Ae(e,I(r,["guard","handleError","alertError"]),n);return Ue(u).catch(function(e){ke(600,Pe[600],u,null,e)}).then(function(e){return o?function(e,t,n){(t.status<200||t.status>=300)&&ke(t.status,Pe[t.status]||t.statusText||"服务器出错了",e,t);var r=new Re(t,n);return Promise.resolve(oe(r)).then(function(){return 0!==r.code&&ke(r.code,r.message||Pe[r.code]||"服务器出错了",e,t),r.response})}(u,e,n):n?e.json():e}).then(function(e){return Ee(),e}).catch(function(e){Ee(),function(e,t,n){if(!t)throw e;if(!e.response||401!==e.response.status)throw(null===n?"GET"!==e.request.method:n)?ut(e.message,e.code):st(e.code,e.message),console.dir(e),e;ut(Pe[401]).then(function(){location.reload()})}(e,i,s)})}function Ie(e,t){return Le(e,t,!1)}function Me(e,t){return Le(e,t,!0)}function Ce(e,t){return Le(e,{method:"POST",body:t},!0)}Re.prototype.setResponse=function(e){this.response=e},Re.prototype.setError=function(e,t){this.code=e,this.message=t},(Oe=M.getElementById("app_loader"))?(je=Oe.tagName,Te=Oe.className,Se=Oe.innerHTML):(je="DIV",Se="<center>loading...</center>");var Ne={functional:!0,render:function(e){return e(je,{class:Te,domProps:{innerHTML:Se}})}},qe=null,Be=null,$e=!1,ze=!1;function We(e,t){qe=e,Be=t}var De={functional:!0,render:function(e,t){var n=t.data,r="props"in n&&n.props||{};return ze?(r.type=2,r.code=qe,r.text=Be):(r.type=0,r.code=404,r.text=null),n.props=r,e(fe,n)}},Fe={},Ve={functional:!0,render:function(e,t){var n=t.data,r="props"in n&&n.props||{},o=_e.$route.path;return r.type=1,$e?($e=!1,r.code=qe,r.text=Be,Fe[o]={c:qe,t:Be}):o in Fe?(r.code=Fe[o].c,r.text=Fe[o].t):(r.code=600,r.text=null),n.props=r,e(fe,n)}};function He(e,t){return le(e).then(function(t){if(null!==t&&"object"==typeof t)return t;var n=new Error("Component ["+e+"] render/template not defined");throw n.code=600,n}).catch(function(e){var n=typeof e,r=600,o=null;if("object"===n){"code"in e&&(r=e.code);var i="toString"in e&&"function"==typeof e.toString?e.toString():null;i&&"string"==typeof i&&(o=i)}else"string"===n&&(o=e);throw t||st(r,o),e.format={code:r,text:o},console.error(e),e})}function Je(e){var t=function(){return{component:He(e,!0).catch(function(e){throw $e=!0,We(e.format.code,e.format.text),e}),loading:Ne,error:Ve}};return function(){return Promise.resolve({functional:!0,render:function(e,n){return e(t,n.data,n.children)}})}}var Ge=0,Ke=0,Qe=[];function Xe(){var e=history.state&&"key"in history.state?history.state.key:null;if(e){var t=Qe.indexOf(e);t<0?(Qe.push(e),Ge=0,Ke=Qe.length-1):(Ge=t>Ke?1:t<Ke?-1:0,Ke=t)}}var Ye="/",Ze=!1,et=!1,tt={name:"AppReloader",beforeRouteEnter:function(e,t,n){Ye=t.fullPath,n()},activated:function(){et=!0,this.$router.replace({path:Ye})},render:function(e){return e("i")}},nt={functional:!0,render:function(e,t){Xe();var n=t.data,r={},o="attrs"in n&&"max"in n.attrs?n.attrs.max:null;null!==o&&(delete n.attrs.max,r.attrs={max:o});var i={},s="staticStyle"in n?n.staticStyle:{};return ze?s.display="none":(s.display="",i.staticStyle={display:"none"}),n.staticStyle=s,e("div",{staticClass:"app-view"},[e(De,i),e("keep-alive",r,[e("router-view",n,t.children)],1)],1)}};function rt(){return Ze?2:Ge}function ot(){ze=!1,_e.$router.replace({path:"/reload"})}function it(e){return He(e,!1)}function st(e,t){We(e,t),ze=!0,_e.$forceUpdate()}function ut(e,t){return ie?ie(_e,e,t):new Promise(function(n){alert((t?"["+t+"]":"")+e),n(!0)})}function at(e){return ie?se(_e,e):new Promise(function(t){confirm(e)&&t(!0)})}var ct={};function lt(e,t){ct[e]=t}function ft(e){return e in ct?ct[e]:void 0}var pt,dt=function(e,t){e.component("appLoading",Ne);var n=t.passport,r=t.menus;e.prototype.$admin={config:{baseUrl:K,apiUrl:V,extendUrl:J,routerMode:H,useVuex:F,vueLibs:G,passport:n,menus:r},reload:ot,loadType:rt,loadComponent:it,error:st,alert:ut,confirm:at,setStore:lt,getStore:ft,startProgress:we,endProgress:Ee,fetch:Ie,fetchJson:Me,postJson:Ce},e.component("AppView",nt)},ht=[],mt="https://cdn.jsdelivr.net/",vt={vue:mt+"npm/vue@2.6.10/dist/vue.min",vue_runtime:mt+"npm/vue@2.6.10/dist/vue.runtime.min",vue_router:mt+"npm/vue-router@3.1.3/dist/vue-router.min",vuex:mt+"npm/vuex@3.1.1/dist/vuex.min",element:mt+"npm/element-ui@2.12.0/lib/index",element_css:mt+"npm/element-ui@2.12.0/lib/theme-chalk/index",less:mt+"npm/less@3.10.3/dist/less.min"},yt={LazyComponent:{},cookieMode:"",auth:!1,passport:null,authFailed:"无法获取登陆状态，请稍后再试",menus:"/menus",menusFailed:"连接服务器失败，请稍后再试",disableMock:!1};var gt=K.split("/").slice(0,-2).join("/")+"/app/",bt=gt+"config.js";function xt(e,t){var n={guard:!1,handleError:!1};return h(gt+"resolveRouter.js").catch(function(){return null}).then(function(e){return e&&ce(e),h(gt+"fetchGuard.js")}).catch(function(){return null}).then(function(e){return e&&(oe=e),h(gt+"alert.js")}).catch(function(){return null}).then(function(e){return e&&(ie=e),h(gt+"confirm.js")}).catch(function(){return null}).then(function(e){return e&&(se=e),L(gt+"error.vue")}).then(function(e){return fe={name:"AppError",extends:e,props:{type:{default:0},code:{default:404},text:{default:null}}},!0}).catch(function(e){return console.error(e),!1}).then(function(){if(!pt.menus)throw"["+bt+"] menus api not set";if(!pt.auth)return{login:!1,passport:{}};if(!pt.passport)throw"["+bt+"] auth is enable, but not set passport api";return Ie(pt.passport,n).then(function(e){var t=200!==e.status;return e.json().then(function(e){return{login:t,passport:e}}).catch(function(e){if(!t)throw"load auth api failed";return{login:t,passport:null}})})}).catch(function(e){throw alert(pt.authFailed),e}).then(function(e){return e.login?L(gt+"login.vue").then(function(t){return{view:t,menus:[],passport:e.passport,login:!0}}):Ie(pt.menus,n).then(function(e){if(200!==e.status)throw alert(pt.menusFailed),"load menus api failed";return e.json()}).then(function(t){return L(gt+"index.vue").then(function(n){return{view:n,menus:t,passport:e.passport}})})}).then(function(n){return n.api={passport:pt.passport,menus:pt.menus},function(e,t,n){var r=n||{},o=r.view,i=r.menus,s=r.passport,u=r.login,a=r.api;dt(e,a);var c=ue?ue(i,Je):[];c.length||u||console.warn("app routes is empty"),c=[{path:"/reload",component:tt}].concat(c,[{path:"*",component:De}]);var l=new t({mode:H,routes:c});l.beforeEach(function(e,t,n){ze=!1,et?(et=!1,Ze=!0):Ze=!1,n()}),o.el="#app",o.router=l,o.mixins=[{data:{menus:i,passport:s}}],_e=new e(o),Oe&&(Oe.parentNode.removeChild(Oe),Oe=null)}(e,t,n)})}function wt(){require(F?["vue","vue-router","vuex"]:["vue","vue-router"],function(e,t,n){e.config.devtools=!0,e.use(t),F&&e.use(n),function(e,t){t.forEach(function(t){re(e,t)}),define("vct",{normalize:ne,load:function(t,n,r,o){n([t],function(t){re(e,t),r(t)})}}),Object.entries(G).forEach(function(e){var t=e[0],n=e[1];define(t,{normalize:ne,load:function(e,t,r,o){t(n.map(function(t){return t+(""==t?"":"/")+e+".js"}),r)}})})}(e,ht),require(pt.peer,function(n){re(e,n),J?require([J],function(){xt(e,t)}):xt(e,t)})})}function Et(e){return L(K+e+".vue")}le=Et,h(bt).then(function(e){var r;pt=function(e,t){var n=Object.assign({},vt,yt,e),r={vue:t?[n.vue_runtime,"vue_runtime"]:[n.vue,"vue"],"vue-router":[n.vue_router,"vue_router"],vuex:[n.vuex,"vuex"],ELEMENT:[n.element,"element"]},o=[n.less,"less"],i=["last!css!"+n.element_css+"#element_css,ELEMENT"],s={paths:Object.assign({},n.paths,r),less:o,peer:i};return Object.keys(yt).forEach(function(e){s[e]=n[e]}),s}(e),r=pt.cookieMode,ae=r,function(e,r){t=e,n=r}(K,pt.disableMock);var o=Object.assign({},pt.paths,{"less.browser":pt.less});requirejs.config({baseUrl:K,paths:o,callback:wt})})}();