(self.webpackChunkhuteming_github_io=self.webpackChunkhuteming_github_io||[]).push([[762],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return u},kt:function(){return m}});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},k=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),k=p(t),m=r,d=k["".concat(s,".").concat(m)]||k[m]||c[m]||o;return t?a.createElement(d,i(i({ref:n},u),{},{components:t})):a.createElement(d,i({ref:n},u))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=k;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=t[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}k.displayName="MDXCreateElement"},5788:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return u},default:function(){return k}});var a=t(2122),r=t(9756),o=(t(7294),t(3905)),i=["components"],l={title:"axios \u6e90\u7801\u89e3\u6790",tags:["http","axios"]},s=void 0,p={permalink:"/en/2021/08/23/axios\u6e90\u7801\u89e3\u6790",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/blog/blog/2021-08-23-axios\u6e90\u7801\u89e3\u6790.md",source:"@site/blog/2021-08-23-axios\u6e90\u7801\u89e3\u6790.md",title:"axios \u6e90\u7801\u89e3\u6790",description:"axios \u6e90\u7801\u4e2d\u51e0\u4e2a\u5173\u952e\u70b9\u7684\u89e3\u6790\u3002\u7248\u672c\u53f7 v0.21.1",date:"2021-08-23T00:00:00.000Z",formattedDate:"August 23, 2021",tags:[{label:"http",permalink:"/en/tags/http"},{label:"axios",permalink:"/en/tags/axios"}],readingTime:5.635,truncated:!0,nextItem:{title:"\u6587\u672c\u6362\u884c",permalink:"/en/2021/08/20/\u6587\u672c\u6362\u884c"}},u=[{value:"1 axios \u4e3a\u4f55\u4f1a\u6709\u591a\u79cd\u4f7f\u7528\u65b9\u5f0f",id:"1-axios-\u4e3a\u4f55\u4f1a\u6709\u591a\u79cd\u4f7f\u7528\u65b9\u5f0f",children:[{value:"1.1 \u4f7f\u7528\u65b9\u5f0f",id:"11-\u4f7f\u7528\u65b9\u5f0f",children:[]},{value:"1.2 \u6e90\u4ee3\u7801",id:"12-\u6e90\u4ee3\u7801",children:[]}]},{value:"2 config \u914d\u7f6e\u65b9\u5f0f",id:"2-config-\u914d\u7f6e\u65b9\u5f0f",children:[{value:"2.1 axios \u7684\u9ed8\u8ba4\u914d\u7f6e",id:"21-axios-\u7684\u9ed8\u8ba4\u914d\u7f6e",children:[]},{value:"2.2 \u76f4\u63a5\u4fee\u6539 axios \u4e0a\u7684\u5c5e\u6027",id:"22-\u76f4\u63a5\u4fee\u6539-axios-\u4e0a\u7684\u5c5e\u6027",children:[]},{value:"2.3 \u5728\u8bf7\u6c42\u7684\u65f6\u5019\u76f4\u63a5\u4f20\u9012\u914d\u7f6e",id:"23-\u5728\u8bf7\u6c42\u7684\u65f6\u5019\u76f4\u63a5\u4f20\u9012\u914d\u7f6e",children:[]},{value:"2.4 \u65b0\u7684\u8bf7\u6c42\u5b9e\u4f8b\u91cd\u65b0\u914d\u7f6e",id:"24-\u65b0\u7684\u8bf7\u6c42\u5b9e\u4f8b\u91cd\u65b0\u914d\u7f6e",children:[]},{value:"2.4 \u914d\u7f6e\u4f18\u5148\u7ea7",id:"24-\u914d\u7f6e\u4f18\u5148\u7ea7",children:[]}]},{value:"3 \u8bf7\u6c42\u53ca\u8bf7\u6c42\u62e6\u622a\u5668\u7684\u5de5\u4f5c\u6d41\u7a0b",id:"3-\u8bf7\u6c42\u53ca\u8bf7\u6c42\u62e6\u622a\u5668\u7684\u5de5\u4f5c\u6d41\u7a0b",children:[]},{value:"4 \u5982\u4f55\u53d6\u6d88\u8bf7\u6c42",id:"4-\u5982\u4f55\u53d6\u6d88\u8bf7\u6c42",children:[{value:"4.1 CancelToken",id:"41-canceltoken",children:[]},{value:"4.2 dispatchRequest",id:"42-dispatchrequest",children:[]},{value:"4.3 XMLHttpRequest",id:"43-xmlhttprequest",children:[]},{value:"4.4 \u8bf7\u6c42\u53d6\u6d88\u6d41\u7a0b\u6982\u62ec",id:"44-\u8bf7\u6c42\u53d6\u6d88\u6d41\u7a0b\u6982\u62ec",children:[]}]},{value:"5 \u8d85\u65f6\u7684\u5904\u7406",id:"5-\u8d85\u65f6\u7684\u5904\u7406",children:[]},{value:"6 \u4f2a\u4ee3\u7801\u6765\u7406\u89e3\u6574\u4e2a\u8fc7\u7a0b",id:"6-\u4f2a\u4ee3\u7801\u6765\u7406\u89e3\u6574\u4e2a\u8fc7\u7a0b",children:[]}],c={toc:u};function k(e){var n=e.components,t=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"axios \u6e90\u7801\u4e2d\u51e0\u4e2a\u5173\u952e\u70b9\u7684\u89e3\u6790\u3002\u7248\u672c\u53f7 ",(0,o.kt)("inlineCode",{parentName:"p"},"v0.21.1")),(0,o.kt)("h2",{id:"1-axios-\u4e3a\u4f55\u4f1a\u6709\u591a\u79cd\u4f7f\u7528\u65b9\u5f0f"},"1 axios \u4e3a\u4f55\u4f1a\u6709\u591a\u79cd\u4f7f\u7528\u65b9\u5f0f"),(0,o.kt)("h3",{id:"11-\u4f7f\u7528\u65b9\u5f0f"},"1.1 \u4f7f\u7528\u65b9\u5f0f"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u7b2c\u4e00\u79cd\uff0c\u76f4\u63a5\u8c03\u7528")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"axios(options)\n\naxios(url, options)\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"\u7b2c\u4e8c\u79cd\uff0c\u5feb\u6377\u65b9\u5f0f\u8c03\u7528")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"axios.get(url, options)\n\naxios.post(url, data, options)\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"\u7b2c\u4e09\u79cd\uff0c\u7528\u7684\u76f8\u5bf9\u4f1a\u5c11\u4e00\u4e9b\uff0c\u8c03\u7528 request \u65b9\u6cd5")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"axios.request(options)\n")),(0,o.kt)("h3",{id:"12-\u6e90\u4ee3\u7801"},"1.2 \u6e90\u4ee3\u7801"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u8def\u5f84: ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/axios.js"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function createInstance(defaultConfig) {\n  // \u521b\u5efa\u4e00\u4e2a Axios \u5b9e\u4f8b\u5bf9\u8c61\u3002\n  // \u6ce8\u610f\u8fd9\u4e2a\u5b9e\u4f8b\u5e76\u4e0d\u662f\u6700\u540e\u5bfc\u51fa\u7684 axios \uff01\uff01\uff01\n  // \u8fd9\u4e2a\u5bf9\u8c61\u53ea\u662f\u7528\u4f5c\u7ed1\u5b9a this\u3002\u5404\u4e2a\u8bf7\u6c42\u4e4b\u95f4\u80fd\u5171\u4eab\u5c5e\u6027\uff08\u5982\uff1a\u62e6\u622a\u5668\uff0c\u914d\u7f6e\u53c2\u6570\u7b49\uff09\u4e5f\u90fd\u662f\u56e0\u4e3a\u6307\u5411\u8fd9\u540c\u4e00\u4e2a this \u6765\u5b8c\u6210\u7684\n  var context = new Axios(defaultConfig)\n  // \u628a Axios \u539f\u578b\u5bf9\u8c61\u4e0a\u7684 request \u7ed1\u5b9a this \u540e\uff0c\u4f5c\u4e3a\u6700\u7ec8\u8fd4\u56de\u7684\u8bf7\u6c42\u65b9\u6cd5\n  var instance = bind(Axios.prototype.request, context)\n\n  // \u590d\u5236 Axios \u539f\u578b\u5bf9\u8c61\u4e0a\u7684\u65b9\u6cd5\uff08\u5982\uff1aget\u3001post\u3001delete\u3001put \u7b49\u7b49\uff09\uff0c\u5e76\u7ed1\u5b9a this\n  utils.extend(instance, Axios.prototype, context)\n\n  // \u590d\u5236 Axios \u5b9e\u4f8b\u5bf9\u8c61\u4e0a\u7684\u5c5e\u6027\uff08\u5982\uff1adefaults\u3001interceptors\uff09\uff0c\u5e76\u7ed1\u5b9a this\n  utils.extend(instance, context)\n\n  // \u6700\u7ec8\u8fd4\u56de\u7684\u662f request \u51fd\u6570\n  // \u901a\u8fc7\u628a\u5176\u4ed6\u8bf7\u6c42\u65b9\u6cd5\u590d\u5236\u5230 request \u51fd\u6570\u5bf9\u8c61\u4e0a\uff0c\u6765\u8fbe\u5230\u6700\u7ec8\u591a\u79cd\u8c03\u7528\u65b9\u5f0f\u7684\u76ee\u7684\n  return instance\n}\n\nvar axios = createInstance(defaults)\n")),(0,o.kt)("p",null,"\u5927\u81f4\u6d41\u7a0b: \u6bcf\u6b21\u8c03\u7528 ",(0,o.kt)("inlineCode",{parentName:"p"},"createInstance")," \u90fd\u4f1a\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u4e0a\u4e0b\u6587\u5b9e\u4f8b\uff0c\u7136\u540e\u628a\u8fd9\u4e2a\u5b9e\u4f8b\u7ed1\u5b9a\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"request")," \u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"this"),"\uff0c\u518d\u901a\u8fc7\u590d\u5236\u7684\u65b9\u5f0f\u628a\u5176\u4ed6\u7684\u65b9\u6cd5\u3001\u5c5e\u6027\u7b49\u7b49\u6302\u8f7d\u5230\u8fd9\u4e2a ",(0,o.kt)("inlineCode",{parentName:"p"},"request")," \u4e0a\u3002\u6700\u540e\u8fd4\u56de\u8fd9\u4e2a\u8bf7\u6c42\u51fd\u6570\u5bf9\u8c61 ",(0,o.kt)("inlineCode",{parentName:"p"},"request"),"\u3002"),(0,o.kt)("p",null,"\u7528\u4e00\u6bb5\u4f2a\u4ee3\u7801\u6765\u8868\u793a\u6700\u7ec8\u6548\u679c\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// \u5b9a\u4e49\nfunction axios() {}\n\naxios.defaults = {}\naxios.interceptors = {\n  request,\n  response,\n}\naxios.get = function () {}\naxios.post = function () {}\naxios.request = function () {}\n\n// \u4f7f\u7528\naxios(options)\naxios.get()\n")),(0,o.kt)("h2",{id:"2-config-\u914d\u7f6e\u65b9\u5f0f"},"2 config \u914d\u7f6e\u65b9\u5f0f"),(0,o.kt)("p",null,"\u4ee5\u914d\u7f6e ",(0,o.kt)("inlineCode",{parentName:"p"},"baseURL"),"\u3001",(0,o.kt)("inlineCode",{parentName:"p"},"timeout")," \u4e3a\u4f8b\u6f14\u793a\u8bf4\u660e\u3002"),(0,o.kt)("h3",{id:"21-axios-\u7684\u9ed8\u8ba4\u914d\u7f6e"},"2.1 axios \u7684\u9ed8\u8ba4\u914d\u7f6e"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u8def\u5f84 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/axios.js"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// /lib/defaults.js\nvar defaults = require('./defaults')\n\nvar axios = createInstance(defaults)\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function createInstance(defaultConfig) {\n  // ...\n  var context = new Axios(defaultConfig)\n  // ...\n}\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u8def\u5f84 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/core/Axios.js"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function Axios(instanceConfig) {\n  this.defaults = instanceConfig\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager(),\n  }\n}\n")),(0,o.kt)("p",null,"\u4ee5\u4e0a\u662f\u51e0\u4e2a\u76f8\u5173\u7684\u4ee3\u7801\u7247\u6bb5\u3002"),(0,o.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\uff0c\u5bfc\u51fa\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"axios")," \u5176\u5b9e\u4e5f\u662f\u901a\u8fc7 ",(0,o.kt)("inlineCode",{parentName:"p"},"createInstance")," \u751f\u6210\u7684\uff0c\u6b64\u65f6\u7684\u914d\u7f6e\u53c2\u6570\u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"axios")," \u7684\u9ed8\u8ba4\u914d\u7f6e\u3002"),(0,o.kt)("p",null,"\u6700\u7ec8\u914d\u7f6e\u5bf9\u8c61\u90fd\u4f1a\u88ab\u4fdd\u5b58\u5728 ",(0,o.kt)("inlineCode",{parentName:"p"},"axios")," \u4e0a\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"defaults")," \u4e2d\u3002"),(0,o.kt)("h3",{id:"22-\u76f4\u63a5\u4fee\u6539-axios-\u4e0a\u7684\u5c5e\u6027"},"2.2 \u76f4\u63a5\u4fee\u6539 axios \u4e0a\u7684\u5c5e\u6027"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u4f7f\u7528\u65b9\u5f0f")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"axios.defaults['baseURL'] = 'http://somesite.com'\naxios.defaults['timeout'] = 8000\n")),(0,o.kt)("p",null,"\u5728\u4e86\u89e3\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"axios")," \u8fd9\u4e2a\u51fd\u6570\u5bf9\u8c61\u4e0a\u6709 ",(0,o.kt)("inlineCode",{parentName:"p"},"defaults")," \u8fd9\u4e2a\u5c5e\u6027\u540e\uff0c\u8fd9\u79cd\u65b9\u5f0f\u5c31\u5f88\u597d\u7406\u89e3\u4e86\uff0c"),(0,o.kt)("p",null,"\u5c31\u662f\u76f4\u63a5\u4fee\u6539 ",(0,o.kt)("inlineCode",{parentName:"p"},"axios")," \u4e0a\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"defaults")," \u5bf9\u8c61"),(0,o.kt)("h3",{id:"23-\u5728\u8bf7\u6c42\u7684\u65f6\u5019\u76f4\u63a5\u4f20\u9012\u914d\u7f6e"},"2.3 \u5728\u8bf7\u6c42\u7684\u65f6\u5019\u76f4\u63a5\u4f20\u9012\u914d\u7f6e"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u4f7f\u7528\u65b9\u5f0f")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"axios.post(url, data, {\n  baseURL: 'http://somesite.com',\n  timeout: 10000,\n})\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u6e90\u4ee3\u7801")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u8def\u5f84 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/core/Axios"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  Axios.prototype[method] = function (url, data, config) {\n    return this.request(\n      mergeConfig(config || {}, {\n        method: method,\n        url: url,\n        data: data,\n      }),\n    )\n  }\n})\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"Axios.prototype.request = function request(config) {\n  // ...\n  config = mergeConfig(this.defaults, config)\n  // ...\n}\n")),(0,o.kt)("p",null,"\u9700\u8981\u518d\u6b21\u5f3a\u8c03\u7684\u662f\uff0c\u867d\u7136\u8fd9\u91cc\u770b\u5230\u7684\u65b9\u6cd5\u90fd\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"Axios")," \u539f\u578b\u5bf9\u8c61\u4e0a\u7684\uff0c\u4f46\u662f\u5b9e\u9645\u90fd\u662f\u5728 ",(0,o.kt)("inlineCode",{parentName:"p"},"createInstance")," \u4e2d\u88ab\u590d\u5236\u5230\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"axios")," \u8fd9\u4e2a\u51fd\u6570\u5bf9\u8c61\u4e0a\uff0c\u5e76\u4e14\u7ed1\u5b9a\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"this")," \u4e3a ",(0,o.kt)("inlineCode",{parentName:"p"},"axios"),"\u3002"),(0,o.kt)("p",null,"\u6240\u4ee5\u770b\u5230\u8fd9\u91cc\uff0c\u601d\u8def\u4e5f\u5f88\u6e05\u6670\u4e86\u3002\u5728 ",(0,o.kt)("inlineCode",{parentName:"p"},"post")," \u4e2d\uff0c\u5b9e\u9645\u5c31\u662f\u628a\u81ea\u8eab\u5feb\u6377\u65b9\u5f0f\u7684\u4e00\u4e9b\u5c5e\u6027\u901a\u8fc7 ",(0,o.kt)("inlineCode",{parentName:"p"},"mergeConfig")," \u5408\u5e76\u5230\u4f20\u5165\u7684\u914d\u7f6e\u5bf9\u8c61 ",(0,o.kt)("inlineCode",{parentName:"p"},"config")," \u4e2d\uff0c\u7136\u540e\u4f20\u9012\u6267\u884c\u771f\u6b63\u7684\u8bf7\u6c42\u65b9\u6cd5 ",(0,o.kt)("inlineCode",{parentName:"p"},"request"),"\u3002"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"request")," \u53c8\u4f1a\u628a\u4f20\u8fdb\u6765\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"config")," \u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"defaults")," \u8fdb\u884c\u5408\u5e76\uff0c\u5f97\u5230\u6700\u7ec8\u7684\u8bf7\u6c42\u914d\u7f6e"),(0,o.kt)("h3",{id:"24-\u65b0\u7684\u8bf7\u6c42\u5b9e\u4f8b\u91cd\u65b0\u914d\u7f6e"},"2.4 \u65b0\u7684\u8bf7\u6c42\u5b9e\u4f8b\u91cd\u65b0\u914d\u7f6e"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u4f7f\u7528\u65b9\u5f0f")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const instance = axios.create({\n  baseURL: 'http://somesite.com',\n  timeout: 12000,\n})\n\ninstance.defaults['baseURL'] = 'http://somesite.com'\ninstance.defaults['timeout'] = 14000\n\ninstance.post(url, data, {\n  baseURL: 'http://somesite.com',\n  timeout: 16000,\n})\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u6e90\u4ee3\u7801")),(0,o.kt)("p",null,"\u5b9e\u4f8b\u4e0a\u4fee\u6539 ",(0,o.kt)("inlineCode",{parentName:"p"},"defaults")," \u4ee5\u53ca\u5728 ",(0,o.kt)("inlineCode",{parentName:"p"},"post")," \u4e2d\u4f20\u5165\u8bf7\u6c42\u914d\u7f6e\uff0c\u539f\u7406\u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"axios")," \u662f\u4e00\u6837\u7684\uff0c\u8fd9\u91cc\u4e0d\u518d\u8d58\u8ff0\u3002"),(0,o.kt)("p",null,"\u5269\u4e0b\u5c31\u662f\u6765\u770b\u4e0b ",(0,o.kt)("inlineCode",{parentName:"p"},"axios.create")," \u505a\u4e86\u4ec0\u4e48\u7279\u522b\u7684\u4e8b\u60c5\u3002"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u8def\u5f84 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/axios"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"axios.create = function create(instanceConfig) {\n  return createInstance(mergeConfig(axios.defaults, instanceConfig))\n}\n")),(0,o.kt)("p",null,"\u8fd9\u91cc\u5c24\u5176\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"create")," \u7684\u914d\u7f6e\u53c2\u6570\u4e0d\u662f\u76f4\u63a5\u4f20\u9012\u7ed9 ",(0,o.kt)("inlineCode",{parentName:"p"},"createInstance"),"\uff0c\u800c\u662f\u5148\u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"axios.defaults")," \u8fdb\u884c\u4e86\u5408\u5e76\uff0c\u7136\u540e\u5728\u4f20\u9012\u4e0b\u53bb\u4f7f\u7528\u3002"),(0,o.kt)("p",null,"\u8fd9\u4e5f\u5c31\u610f\u5473\u7740\uff0c\u901a\u8fc7 ",(0,o.kt)("inlineCode",{parentName:"p"},"axios.create")," \u521b\u5efa\u7684\u5b9e\u4f8b\uff0c\u90fd\u662f\u4f1a\u7ee7\u627f ",(0,o.kt)("inlineCode",{parentName:"p"},"axios.defaults")," \u4e0a\u7684\u914d\u7f6e\u3002"),(0,o.kt)("p",null,"\u6240\u4ee5\u5728\u5e73\u65f6\u5f00\u53d1\u4e2d\uff0c\u901a\u8fc7 ",(0,o.kt)("inlineCode",{parentName:"p"},"axios.defaults")," \u76f4\u63a5\u4fee\u6539\u914d\u7f6e\u65f6\uff0c\u9700\u8981\u8c28\u614e\u5224\u65ad\uff0c\u8fd9\u4e2a\u5c5e\u6027\u662f\u5426\u771f\u7684\u6709\u5fc5\u8981\u88ab\u9879\u76ee\u4e2d\u5176\u4ed6\u5b9e\u4f8b\u7ee7\u627f"),(0,o.kt)("h3",{id:"24-\u914d\u7f6e\u4f18\u5148\u7ea7"},"2.4 \u914d\u7f6e\u4f18\u5148\u7ea7"),(0,o.kt)("p",null,"\u4e86\u89e3\u4e86\u51e0\u79cd\u8bf7\u6c42\u914d\u7f6e\u7684\u65b9\u5f0f\u540e\uff0c\u6700\u540e\u68b3\u7406\u4e0b\u51e0\u79cd\u65b9\u5f0f\u4ea7\u751f\u914d\u7f6e\u7684\u4f18\u5148\u7ea7\uff0c\u5206\u4e24\u79cd\u60c5\u51b5\uff0c\u4e5f\u5c31\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"axios")," \u4ee5\u53ca ",(0,o.kt)("inlineCode",{parentName:"p"},"axios \u5b9e\u4f8b")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"axios \u76f4\u63a5\u8bf7\u6c42")),(0,o.kt)("p",null,"\u4f18\u5148\u7ea7\u4ece\u9ad8\u5230\u4f4e\u4f9d\u6b21\u4e3a"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u4e00\u4e9b\u5feb\u6377\u65b9\u5f0f\u7279\u5b9a\u7684\u914d\u7f6e\u3002\u5982 post \u8bf7\u6c42\uff0c{ method: 'post' }")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"post options\u3002\u4e00\u6b21\u6027\u7684\uff0c\u4e0d\u4f1a\u5f71\u54cd\u540e\u7eed\u8bf7\u6c42")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"axios \u4e0a\u7684 defaults \u5c5e\u6027")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u5168\u5c40\u9ed8\u8ba4\u914d\u7f6e\u5bf9\u8c61 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/defaults")))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"axios \u5b9e\u4f8b instance \u53d1\u8d77\u7684\u8bf7\u6c42")),(0,o.kt)("p",null,"\u4f18\u5148\u7ea7\u4ece\u9ad8\u5230\u4f4e\u4f9d\u6b21\u4e3a"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u4e00\u4e9b\u5feb\u6377\u65b9\u5f0f\u7279\u5b9a\u7684\u914d\u7f6e\u3002\u5982 post \u8bf7\u6c42\uff0c{ method: 'post' }")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"post options\u3002\u4e00\u6b21\u6027\u7684\uff0c\u4e0d\u4f1a\u5f71\u54cd\u540e\u7eed\u8bf7\u6c42")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u901a\u8fc7 axios.create \u4f20\u5165\u7684\u914d\u7f6e")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"axios \u4e0a\u7684 defaults \u5c5e\u6027")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u5168\u5c40\u9ed8\u8ba4\u914d\u7f6e\u5bf9\u8c61 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/defaults")))),(0,o.kt)("h2",{id:"3-\u8bf7\u6c42\u53ca\u8bf7\u6c42\u62e6\u622a\u5668\u7684\u5de5\u4f5c\u6d41\u7a0b"},"3 \u8bf7\u6c42\u53ca\u8bf7\u6c42\u62e6\u622a\u5668\u7684\u5de5\u4f5c\u6d41\u7a0b"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u76ee\u5f55 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/core/Axios"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"Axios.prototype.request = function request(config) {\n  // \u540c\u6b65\u8fd8\u662f\u5f02\u6b65\u7684\u65b9\u5f0f\u6267\u884c\u62e6\u622a\u5668 true: \u540c\u6b65\uff1bfalse\uff1a\u5f02\u6b65\n  // \u8fd9\u91cc\u9ed8\u8ba4\u867d\u7136\u662f\u540c\u6b65\u7684\uff0c\u4f46 request \u62e6\u622a\u5668\u9ed8\u8ba4\u4ee5\u5f02\u6b65\u7684\u65b9\u5f0f\u5904\u7406\u3002\n  // \u6dfb\u52a0 request \u62e6\u622a\u5668\u4e4b\u540e\u4f1a\u88ab\u4fee\u6539\n  var synchronousRequestInterceptors = true\n  // request \u62e6\u622a\u5668\u6570\u7ec4\uff0c\u5076\u6570\u4e2a\u3002 fulfilled\u3001rejected \u4e00\u7ec4\u5e73\u94fa\u6dfb\u52a0\n  var requestInterceptorChain = []\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(\n    interceptor,\n  ) {\n    // synchronous \u9ed8\u8ba4\u662f false, \u9ed8\u8ba4\u662f\u7528\u5f02\u6b65\u7684\u65b9\u5f0f\u5904\u7406\n    synchronousRequestInterceptors =\n      synchronousRequestInterceptors && interceptor.synchronous\n\n    // \u6ce8\u610f\uff0c\u8fd9\u91cc\u662f\u4ee5\u6dfb\u52a0 request \u62e6\u622a\u5668\u7684\u5012\u5e8f\u6267\u884c\n    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected)\n  })\n\n  // response \u62e6\u622a\u5668\u6570\u7ec4\uff0c\u5076\u6570\u4e2a\u3002 fulfilled\u3001rejected \u4e00\u7ec4\u5e73\u94fa\u6dfb\u52a0\n  var responseInterceptorChain = []\n  this.interceptors.response.forEach(function pushResponseInterceptors(\n    interceptor,\n  ) {\n    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected)\n  })\n\n  var promise\n\n  // \u5f02\u6b65\u7684\u65b9\u5f0f\u5904\u7406\u62e6\u622a\u5668\n  if (!synchronousRequestInterceptors) {\n    // \u4fdd\u6301 fulfilled\u3001rejected \u4e00\u7ec4\u7684\u5f62\u5f0f\u3002\u6240\u4ee5\u6570\u7ec4\u7b2c\u4e8c\u4e2a\u662f undefined\n    // dispatchRequest \u5c31\u662f\u53d1\u8d77 XMLHttpRequest \u8bf7\u6c42\u7684\u65b9\u6cd5\n    var chain = [dispatchRequest, undefined]\n\n    Array.prototype.unshift.apply(chain, requestInterceptorChain)\n    chain = chain.concat(responseInterceptorChain)\n\n    // \u628a config \u4ee5 Promise \u5f62\u5f0f\u5305\u88c5\n    promise = Promise.resolve(config)\n    while (chain.length) {\n      // \u5f62\u6210 promise \u5b8c\u6574\u94fe\u6761\n      promise = promise.then(chain.shift(), chain.shift())\n    }\n\n    return promise\n  }\n  // \u540c\u6b65\u7684\u65b9\u5f0f\u5904\u7406\u62e6\u622a\u5668\n  // ...\n}\n")),(0,o.kt)("p",null,"\u5728\u79fb\u9664\u4e00\u4e9b\u5176\u4ed6\u529f\u80fd\u4ee3\u7801\u540e\uff0c\u53ef\u4ee5\u6e05\u6670\u7684\u770b\u5230\uff0c\u6574\u4e2a\u8fc7\u7a0b\u5176\u5b9e\u5c31\u662f\u4e00\u4e2a promise \u94fe\u6761\u6267\u884c\u7684\u8fc7\u7a0b\u3002"),(0,o.kt)("p",null,"\u7528\u4e00\u6bb5\u4f2a\u4ee3\u7801\u6765\u8868\u793a\u6700\u7ec8\u6548\u679c"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// \u62e6\u622a\u5668\u914d\u7f6e\naxios.interceptors.request.use(request11, request12)\naxios.interceptors.request.use(request21, request22)\n\naxios.interceptors.response.use(response31, response32)\naxios.interceptors.response.use(response41, response42)\n\n// \u6700\u7ec8\u6267\u884c\u987a\u5e8f\nPromise.resolve(config)\n  // request \u5012\u5e8f\u6267\u884c\n  .then(request21, request22)\n  .then(request11, request12)\n  .then(dispatchRequest)\n  // response \u987a\u5e8f\u6267\u884c\n  .then(response31, response32)\n  .then(response41, response42)\n")),(0,o.kt)("h2",{id:"4-\u5982\u4f55\u53d6\u6d88\u8bf7\u6c42"},"4 \u5982\u4f55\u53d6\u6d88\u8bf7\u6c42"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u4f7f\u7528\u65b9\u5f0f")),(0,o.kt)("p",null,"\u5b98\u65b9\u7ed9\u51fa\u7684\u4f7f\u7528\u65b9\u5f0f"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const CancelToken = axios.CancelToken\nlet cancel\n\naxios.get('/user/12345', {\n  cancelToken: new CancelToken(function executor(c) {\n    // An executor function receives a cancel function as a parameter\n    cancel = c\n  }),\n})\n\n// cancel the request\ncancel()\n")),(0,o.kt)("p",null,"\u5b98\u65b9\u8fd8\u6709\u53e6\u5916\u4e00\u79cd\u4f7f\u7528\u65b9\u5f0f\u3002\u4f46\u4e0b\u9762\u770b\u8fc7\u4ee3\u7801\u4e4b\u540e\u5c31\u4f1a\u53d1\u73b0\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"CancelToken.source()")," \u5176\u5b9e\u4e5f\u662f ",(0,o.kt)("inlineCode",{parentName:"p"},"new CancelToken()")," \u7684\u8fc7\u7a0b\uff0c\u6240\u4ee5\u4e0b\u9762\u4e3b\u8981\u5206\u6790\u4e0a\u9762\u4e00\u79cd\u4f7f\u7528\u65b9\u5f0f"),(0,o.kt)("h3",{id:"41-canceltoken"},"4.1 CancelToken"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u8def\u5f84 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/cancel/CancelToken"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function CancelToken(executor) {\n  var resolvePromise\n  // \u521b\u5efa\u4e00\u4e2a promise\uff0c\u62ff\u5230 resolve \u65b9\u6cd5\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve\n  })\n\n  var token = this\n  // \u5c06\u53d6\u6d88 cancel \u65b9\u6cd5\u4f5c\u4e3a\u53c2\u6570\uff0c\u4f20\u5165\u56de\u8c03\u51fd\u6570\uff0c\u5e76\u7acb\u5373\u6267\u884c\u56de\u8c03\u51fd\u6570\n  executor(function cancel(message) {\n    // \u907f\u514d\u91cd\u590d\u8c03\u7528\n    if (token.reason) {\n      return\n    }\n\n    // cancel \u53ea\u662f\u628a promise \u7f6e\u4e3a resolve \u72b6\u6001\n    token.reason = new Cancel(message)\n    resolvePromise(token.reason)\n  })\n}\n\nCancelToken.source = function source() {\n  var cancel\n  var token = new CancelToken(function executor(c) {\n    cancel = c\n  })\n  return {\n    token: token,\n    cancel: cancel,\n  }\n}\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"CancelToken.source")," \u5176\u5b9e\u4e5f\u662f\u5b9e\u4f8b\u5316 ",(0,o.kt)("inlineCode",{parentName:"p"},"CancelToken")," \u7684\u8fc7\u7a0b\uff0c\u7136\u540e\u628a\u5b9e\u4f8b\u4fe1\u606f\u8fd4\u56de\u3002"),(0,o.kt)("p",null,"\u4e3b\u8981\u770b ",(0,o.kt)("inlineCode",{parentName:"p"},"CancelToken")," \u8fd9\u4e2a\u6784\u9020\u51fd\u6570\u3002\u5b83\u4e3b\u8981\u505a\u4e86\u51e0\u4ef6\u4e8b\uff1a"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u521b\u5efa\u65b0\u7684 Promise\uff0c\u5e76\u628a\u5b83\u6302\u5728 ",(0,o.kt)("inlineCode",{parentName:"p"},"CancelToken")," \u5b9e\u4f8b\u4e0a\u3002\u540c\u65f6\u62ff\u5230\u8fd9\u4e2a Promise \u7684 resolve \u65b9\u6cd5\u3002")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u7acb\u5373\u6267\u884c\u4f20\u5165\u7684\u56de\u8c03\u51fd\u6570\u3002")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u56de\u8c03\u51fd\u6570\u7684\u5165\u53c2\u662f\u4e00\u4e2a cancel \u65b9\u6cd5\u3002")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"cancel \u65b9\u6cd5\u5c31\u662f\u6267\u884c\u5b9e\u4f8b\u4e0a Promise \u7684 resolve \u65b9\u6cd5\u7684\u8fc7\u7a0b\u3002"))),(0,o.kt)("p",null,"\u6240\u4ee5 ",(0,o.kt)("inlineCode",{parentName:"p"},"CancelToken")," \u53ef\u4ee5\u6982\u62ec\u4e3a\uff1a",(0,o.kt)("strong",{parentName:"p"},"\u521b\u5efa\u4e00\u4e2a Promise\uff0c\u5e76\u901a\u8fc7\u4e00\u5b9a\u624b\u6bb5\uff0c\u5916\u90e8\u80fd\u624b\u52a8\u63a7\u5236\u8fd9\u4e2a Promise \u7684\u72b6\u6001")),(0,o.kt)("p",null,"\u8fd9\u6709\u4ec0\u4e48\u7528\u5462\uff1f"),(0,o.kt)("p",null,"\u7ee7\u7eed\u770b\u4e0b\u4e0a\u9762\u8bf4\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"dispatchRequest"),"\uff0c\u5728\u53d1\u9001\u8bf7\u6c42\u65f6\u505a\u4e86\u4ec0\u4e48\u3002"),(0,o.kt)("h3",{id:"42-dispatchrequest"},"4.2 dispatchRequest"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u8def\u5f84 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/cancel/CancelToken"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"CancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason\n  }\n}\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u8def\u5f84 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/core/dispatchRequest"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// \u5224\u65ad\u5982\u679c\u8be5\u8bf7\u6c42\u88ab cancel \u4e86, \u629b\u51fa\u5f02\u5e38\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested()\n  }\n}\n\nfunction dispatchRequest(config) {\n  throwIfCancellationRequested(config)\n\n  // \u6839\u636e\u73af\u5883\uff0c\u53d1\u9001\u8bf7\u6c42\uff0c\u5e76 Promise \u5316\n  // \u6d4f\u89c8\u5668\u73af\u5883\u4e0b\uff0c\u5c31\u662f\u5229\u7528 XMLHttpRequest\n  var adapter = config.adapter || defaults.adapter\n\n  return adapter(config).then(\n    function onAdapterResolution(response) {\n      throwIfCancellationRequested(config)\n\n      return response\n    },\n    function onAdapterRejection(reason) {\n      if (!isCancel(reason)) {\n        throwIfCancellationRequested(config)\n      }\n\n      return Promise.reject(reason)\n    },\n  )\n}\n")),(0,o.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\uff0c",(0,o.kt)("inlineCode",{parentName:"p"},"dispatchRequest")," \u4e3b\u8981\u505a\u4e86\u51e0\u4ef6\u4e8b\uff1a"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u53d1\u9001\u8bf7\u6c42\u4e4b\u524d\uff0c\u5224\u65ad\u8be5\u8bf7\u6c42\u662f\u5426\u88ab\u53d6\u6d88")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u53d1\u9001\u8bf7\u6c42")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"\u53d1\u9001\u8bf7\u6c42\u4e4b\u540e\uff0c\u518d\u6b21\u5224\u65ad\u662f\u5426\u88ab\u53d6\u6d88"))),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"dispatchRequest")," \u53ef\u4ee5\u6982\u62ec\u4e3a\uff1a",(0,o.kt)("strong",{parentName:"p"},"\u53d1\u9001\u8bf7\u6c42\uff0c\u53ca\u5176\u6d41\u7a0b\u72b6\u6001\u5224\u65ad")),(0,o.kt)("p",null,"\u63a5\u4e0b\u6765\u770b\u4e0b\u6d4f\u89c8\u5668\u73af\u5883\u4e0b\u53d1\u9001\u8bf7\u6c42\u7684\u65b9\u6cd5"),(0,o.kt)("h3",{id:"43-xmlhttprequest"},"4.3 XMLHttpRequest"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u8def\u5f84 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/adapters/xhr.js"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var request = new XMLHttpRequest()\n\n    request.open(\n      config.method.toUpperCase(),\n      buildURL(fullPath, config.params, config.paramsSerializer),\n      true,\n    )\n\n    if (config.cancelToken) {\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return\n        }\n\n        request.abort()\n        reject(cancel)\n        request = null\n      })\n    }\n\n    request.send(requestData)\n  })\n}\n")),(0,o.kt)("p",null,"\u8fd9\u91cc\u6211\u79fb\u9664\u4e86\u4e00\u4e9b\u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"XMLHttpRequest")," \u8bf7\u6c42\u5c5e\u6027\u76f8\u5173\u7684\u4ee3\u7801\uff0c\u53ea\u7559\u4e0b\u4e86\u8fd9\u6b21\u5206\u6790\u5173\u6ce8\u7684\u70b9\u3002"),(0,o.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\uff0c\u9664\u4e86 ",(0,o.kt)("inlineCode",{parentName:"p"},"request")," \u6b63\u5e38\u7684\u54cd\u5e94\u4e4b\u5916\uff0c\u540c\u65f6\u8fd8\u591a\u4e86\u4e00\u4e2a\u548c ",(0,o.kt)("inlineCode",{parentName:"p"},"CancelToken")," \u76f8\u5173\u7684\u72b6\u6001\u3002"),(0,o.kt)("p",null,"\u8fd9\u91cc\u7684\u5904\u7406\u65b9\u5f0f\u5f88\u7b80\u5355\uff0c\u5c31\u662f\u5224\u65ad ",(0,o.kt)("inlineCode",{parentName:"p"},"config")," \u4e2d\u662f\u5426\u6709 ",(0,o.kt)("inlineCode",{parentName:"p"},"cancelToken")," \u5b9e\u4f8b\uff0c\u5982\u679c\u6709\uff0c\u5c31\u5728\u5b9e\u4f8b\u7684 ",(0,o.kt)("inlineCode",{parentName:"p"},"promise")," \u4e0a\u6302\u4e00\u4e2a ",(0,o.kt)("inlineCode",{parentName:"p"},"then"),"\uff0c"),(0,o.kt)("p",null,"\u53ea\u8981\u8fd9\u4e2a ",(0,o.kt)("inlineCode",{parentName:"p"},"promise")," \u72b6\u6001\u6539\u53d8\uff0c\u5c31\u628a\u8fd9\u6b21\u8bf7\u6c42 ",(0,o.kt)("inlineCode",{parentName:"p"},"reject"),"\uff0c\u7ed3\u675f\u8bf7\u6c42\uff0c\u629b\u51fa\u5f02\u5e38\u3002"),(0,o.kt)("h3",{id:"44-\u8bf7\u6c42\u53d6\u6d88\u6d41\u7a0b\u6982\u62ec"},"4.4 \u8bf7\u6c42\u53d6\u6d88\u6d41\u7a0b\u6982\u62ec"),(0,o.kt)("p",null,"\u4ee3\u7801\u662f\u770b\u5b8c\u4e86\uff0c\u518d\u6765\u7528\u6587\u5b57\u63cf\u8ff0\u4e0b\u8fd9\u4e2a\u8fc7\u7a0b\u3002"),(0,o.kt)("p",null,"\u5728\u53d1\u8d77 ",(0,o.kt)("inlineCode",{parentName:"p"},"http")," \u8bf7\u6c42\u7684\u540c\u65f6\uff0c\u589e\u52a0\u4e00\u4e2a\u7ade\u4e89\u6001 Cancel Promise\uff0c\u5f53\u5916\u754c\u624b\u52a8\u53d6\u6d88\u65f6\uff0c\u5c06\u8fd9\u4e2a\u7ade\u4e89\u6001\u7f6e\u4e3a\u5df2\u5b8c\u6210\uff0c\u7ed3\u675f\u8fd9\u6b21 ",(0,o.kt)("inlineCode",{parentName:"p"},"http")," \u8bf7\u6c42\u3002"),(0,o.kt)("p",null,"\u7528\u4e00\u6bb5\u4f2a\u4ee3\u7801\u6765\u8868\u793a\u6700\u7ec8\u6548\u679c"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function dispatchRequest() {\n  return Promise.race([XMLHttpRequestPromise, CancelPromise])\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"\u4e2a\u4eba\u731c\u6d4b")),(0,o.kt)("p",null,"\u56e0\u4e3a Promise \u662f\u4e00\u4e2a\u5fae\u4efb\u52a1\uff0c\u4e3a\u4e86\u9632\u6b62\u56e0\u4e3a\u4e8b\u4ef6\u5faa\u73af\u7684\u673a\u5236\u51fa\u73b0\u4e00\u4e9b\u4e89\u8bae\uff0c"),(0,o.kt)("p",null,"(\u5982\uff1a\u5728\u8bf7\u6c42\u6b63\u5e38\u54cd\u5e94\u4f46\u540e\u7eed then \u65b9\u6cd5\u672a\u6267\u884c\u4e4b\u524d\uff0c\u5916\u754c\u6267\u884c\u4e86 cancel\uff0c\u6b64\u65f6\u8be5\u600e\u4e48\u7406\u89e3\u8fd9\u6b21\u8bf7\u6c42\u7684\u72b6\u6001\uff1f)\uff0c"),(0,o.kt)("p",null,"\u6240\u4ee5 axios \u5728\u53d1\u9001\u8bf7\u6c42\u4e4b\u524d\u548c\u4e4b\u540e\u90fd\u6dfb\u52a0\u4e86 cancel \u7684\u5224\u65ad"),(0,o.kt)("h2",{id:"5-\u8d85\u65f6\u7684\u5904\u7406"},"5 \u8d85\u65f6\u7684\u5904\u7406"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"XMLHttpRequest")," \u672c\u8eab\u5c31\u80fd\u8bbe\u7f6e\u8d85\u65f6\uff0c\u6240\u4ee5\u53ea\u9700\u8981\u76d1\u542c\u8fd9\u4e2a\u65b9\u6cd5\u6765\u7ed3\u675f\u8fd9\u6b21\u8bf7\u6c42"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"\u4ee3\u7801\u8def\u5f84 ",(0,o.kt)("inlineCode",{parentName:"p"},"/lib/adapters/xhr.js"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var request = new XMLHttpRequest()\n\n    request.open(\n      config.method.toUpperCase(),\n      buildURL(fullPath, config.params, config.paramsSerializer),\n      true,\n    )\n\n    request.timeout = config.timeout\n\n    request.ontimeout = function handleTimeout() {\n      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded'\n      if (config.timeoutErrorMessage) {\n        timeoutErrorMessage = config.timeoutErrorMessage\n      }\n      reject(\n        createError(\n          timeoutErrorMessage,\n          config,\n          config.transitional && config.transitional.clarifyTimeoutError\n            ? 'ETIMEDOUT'\n            : 'ECONNABORTED',\n          request,\n        ),\n      )\n\n      // Clean up request\n      request = null\n    }\n\n    // Send the request\n    request.send(requestData)\n  })\n}\n")),(0,o.kt)("h2",{id:"6-\u4f2a\u4ee3\u7801\u6765\u7406\u89e3\u6574\u4e2a\u8fc7\u7a0b"},"6 \u4f2a\u4ee3\u7801\u6765\u7406\u89e3\u6574\u4e2a\u8fc7\u7a0b"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"function axios(config) {\n  return Promise.resolve(config)\n    .then(requestHandler)\n    .then(dispatchRequest)\n    .then(responseHandler)\n}\n\naxios.defaults = {}\n\naxios.post = function (url, data, options) {\n  return axios({\n    ...axios.defaults,\n    ...options,\n    url,\n    method: 'post',\n    data,\n  })\n}\n\n// prettier-ignore\nfunction dispatchRequest(config) {\n  return Promise.race([\n    XMLHttpRequestPromise,\n    CancelPromise,\n    TimeoutPromise,\n  ])\n}\n")))}k.isMDXComponent=!0}}]);