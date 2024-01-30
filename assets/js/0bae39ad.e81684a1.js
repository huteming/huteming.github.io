"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3489],{1131:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>d,contentTitle:()=>c,default:()=>j,frontMatter:()=>i,metadata:()=>l,toc:()=>t});var s=n(3010),o=n(4109);const i={},c=void 0,l={id:"js/Workers",title:"Workers",description:"\u901a\u8fc7\u4f7f\u7528 Workers\uff0cWeb \u5e94\u7528\u7a0b\u5e8f\u53ef\u4ee5\u5728\u72ec\u7acb\u4e8e\u4e3b\u7ebf\u7a0b\u7684\u540e\u53f0\u7ebf\u7a0b\u4e2d\uff0c\u8fd0\u884c\u4e00\u4e2a\u811a\u672c\u64cd\u4f5c\u3002",source:"@site/docs/js/Workers.md",sourceDirName:"js",slug:"/js/Workers",permalink:"/docs/js/Workers",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"CommonJS\u548cES\u6a21\u5757\u5dee\u5f02",permalink:"/docs/js/CommonJS\u548cES\u6a21\u5757\u5dee\u5f02"},next:{title:"typeof\u3001instanceof\u3001toString\u533a\u522b",permalink:"/docs/js/typeof\u3001instanceof\u3001toString\u533a\u522b"}},d={},t=[{value:"1. Web worker \u548c service worker",id:"1-web-worker-\u548c-service-worker",level:2},{value:"\u76f8\u540c\u70b9",id:"\u76f8\u540c\u70b9",level:3},{value:"\u4e0d\u540c\u70b9",id:"\u4e0d\u540c\u70b9",level:3},{value:"2. Service Workers",id:"2-service-workers",level:2},{value:"3. \u7528\u4f8b",id:"3-\u7528\u4f8b",level:2},{value:"Web Worker",id:"web-worker",level:3},{value:"Service Worker",id:"service-worker",level:3},{value:"4. \u5b9e\u73b0",id:"4-\u5b9e\u73b0",level:2}];function h(e){const r={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(r.p,{children:["\u901a\u8fc7\u4f7f\u7528 ",(0,s.jsx)(r.code,{children:"Workers"}),"\uff0cWeb \u5e94\u7528\u7a0b\u5e8f\u53ef\u4ee5\u5728\u72ec\u7acb\u4e8e\u4e3b\u7ebf\u7a0b\u7684\u540e\u53f0\u7ebf\u7a0b\u4e2d\uff0c",(0,s.jsx)(r.code,{children:"\u8fd0\u884c\u4e00\u4e2a\u811a\u672c\u64cd\u4f5c"}),"\u3002\n\u8fd9\u6837\u505a\u7684\u597d\u5904\u662f\u53ef\u4ee5\u5728\u72ec\u7acb\u7ebf\u7a0b\u4e2d\u6267\u884c\u8d39\u65f6\u7684\u5904\u7406\u4efb\u52a1\uff0c\u4ece\u800c\u5141\u8bb8\u4e3b\u7ebf\u7a0b\u4e0d\u4f1a\u56e0\u6b64\u88ab\u963b\u585e\u3002"]}),"\n",(0,s.jsxs)(r.p,{children:["\u6ce8\u610f: ",(0,s.jsx)(r.a,{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API",children:"MDN"}),"\u7684\u89e3\u91ca\u4e2d\uff0c\u53ea\u662f\u8bf4\u4f7f\u7528 API\uff0c\u53ef\u4ee5\u5728\u540e\u53f0\u7ebf\u7a0b\u4e2d\u8fd0\u884c\u4e00\u4e2a\u811a\u672c\uff0c\n\u5e76\u6ca1\u6709\u8bf4\u521b\u5efa\u4e00\u4e2a\u540e\u53f0\u7ebf\u7a0b\u3002"]}),"\n",(0,s.jsx)(r.h2,{id:"1-web-worker-\u548c-service-worker",children:"1. Web worker \u548c service worker"}),"\n",(0,s.jsx)(r.h3,{id:"\u76f8\u540c\u70b9",children:"\u76f8\u540c\u70b9"}),"\n",(0,s.jsxs)(r.ol,{children:["\n",(0,s.jsx)(r.li,{children:"\u90fd\u662f\u5728\u540e\u53f0\u7ebf\u7a0b\u4e2d\u8fd0\u884c\uff0c\u4e0d\u4f1a\u963b\u585e\u4e3b\u7ebf\u7a0b\u3002"}),"\n",(0,s.jsx)(r.li,{children:"\u4e0d\u80fd\u64cd\u4f5c DOM\u3002"}),"\n"]}),"\n",(0,s.jsx)(r.h3,{id:"\u4e0d\u540c\u70b9",children:"\u4e0d\u540c\u70b9"}),"\n",(0,s.jsxs)(r.ol,{children:["\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"Service Worker"})," \u5141\u8bb8\u60a8\u62e6\u622a\u7f51\u7edc\u8bf7\u6c42"]}),"\n",(0,s.jsxs)(r.li,{children:["\u4e00\u4e2a\u9875\u9762\u53ef\u4ee5\u4ea7\u751f\u591a\u4e2a ",(0,s.jsx)(r.code,{children:"web worker"}),"\uff0c\u4f46\u662f\u53ea\u6709\u4e00\u4e2a ",(0,s.jsx)(r.code,{children:"service worker"}),"\uff0c\u63a7\u5236\u7740\u5b83\u6ce8\u518c\u8303\u56f4\u5185\u7684\u6240\u6709\u6d3b\u52a8\u9875\u9762\u3002"]}),"\n",(0,s.jsxs)(r.li,{children:["\u5173\u95ed\u8fd0\u884c ",(0,s.jsx)(r.code,{children:"web worker"})," \u7684\u9875\u9762\u5c06\u7ec8\u6b62\u5b83\uff0c\u800c ",(0,s.jsx)(r.code,{children:"service worker"})," \u53ef\u4ee5\u7ee7\u7eed\u5728\u540e\u53f0\u8fd0\u884c\uff0c\u5373\u4f7f\u7ad9\u70b9\u6ca1\u6709\u6253\u5f00\u4efb\u4f55\u6d3b\u52a8\u9875\u9762"]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"web worker"})," \u53ef\u4ee5\u4f7f\u7528\u5927\u90e8\u5206 ",(0,s.jsx)(r.code,{children:"window"})," \u5bf9\u8c61\u7684\u65b9\u6cd5\u548c\u5c5e\u6027\uff0c\u5305\u62ec ",(0,s.jsx)(r.code,{children:"WebSockets"}),"\u3001",(0,s.jsx)(r.code,{children:"Storage"}),"\u3001",(0,s.jsx)(r.code,{children:"XMLHttpRequest"})," \u7b49"]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"service worker"})," \u4e0d\u80fd\u4f7f\u7528 ",(0,s.jsx)(r.code,{children:"Storage"}),"\u3001",(0,s.jsx)(r.code,{children:"XMLHttpRequest"}),"\uff0c\u5e76\u4e14\u51fa\u4e8e\u5b89\u5168\u8003\u91cf\uff0c\u53ea\u80fd\u7531 ",(0,s.jsx)(r.code,{children:"HTTPS"})," \u627f\u8f7d\uff0c",(0,s.jsx)(r.strong,{children:"\u6bd5\u7adf\u4fee\u6539\u7f51\u7edc\u8bf7\u6c42\u7684\u80fd\u529b\u66b4\u9732\u7ed9\u4e2d\u95f4\u4eba\u653b\u51fb\u4f1a\u975e\u5e38\u5371\u9669"}),"\u3002"]}),"\n"]}),"\n",(0,s.jsx)(r.h2,{id:"2-service-workers",children:"2. Service Workers"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"Service Workers"})," \u4e00\u822c\u4f5c\u4e3a web \u5e94\u7528\u7a0b\u5e8f\u3001\u6d4f\u89c8\u5668\u548c\u7f51\u7edc\uff08\u5982\u679c\u53ef\u7528\uff09\u4e4b\u95f4\u7684",(0,s.jsx)(r.strong,{children:"\u4ee3\u7406\u670d\u52a1"}),"\u3002\u4ed6\u4eec\u65e8\u5728\u521b\u5efa\u6709\u6548\u7684\u79bb\u7ebf\u4f53\u9a8c\uff0c\u62e6\u622a\u7f51\u7edc\u8bf7\u6c42\uff0c\u4ee5\u53ca\u6839\u636e\u7f51\u7edc\u662f\u5426\u53ef\u7528\u91c7\u53d6\u5408\u9002\u7684\u884c\u52a8\uff0c\u66f4\u65b0\u9a7b\u7559\u5728\u670d\u52a1\u5668\u4e0a\u7684\u8d44\u6e90\u3002\u4ed6\u4eec\u8fd8\u5c06\u5141\u8bb8\u8bbf\u95ee\u63a8\u9001\u901a\u77e5\u548c\u540e\u53f0\u540c\u6b65 API\u3002"]}),"\n",(0,s.jsx)(r.h2,{id:"3-\u7528\u4f8b",children:"3. \u7528\u4f8b"}),"\n",(0,s.jsx)(r.h3,{id:"web-worker",children:"Web Worker"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"Web Worker "})," \u7684\u7528\u4f8b\u901a\u5e38\u4e0e\u7e41\u91cd\u7684\u8ba1\u7b97\u76f8\u5173\uff0c\u4ee5\u907f\u514d\u963b\u585e UI\u3002"]}),"\n",(0,s.jsx)(r.p,{children:"\u793a\u4f8b: \u6784\u5efa\u89c6\u9891\u6e38\u620f\u5e0c\u671b\u8ba9\u4e3b\u7ebf\u7a0b\u5c3d\u53ef\u80fd\u7a7a\u95f2\uff0c\u4ee5\u5904\u7406\u7528\u6237\u8f93\u5165\u548c\u52a8\u753b\u3002\u4e3a\u5b9e\u73b0\u8fd9\u4e00\u76ee\u6807\uff0c\u4ed6\u4eec\u4f7f\u7528\u7f51\u7edc\u5de5\u4f5c\u8005\u5728\u5355\u72ec\u7684\u7ebf\u7a0b\u4e0a\u8fd0\u884c\u6e38\u620f\u903b\u8f91\u548c\u72b6\u6001\u7ef4\u62a4\u3002"}),"\n",(0,s.jsx)(r.h3,{id:"service-worker",children:"Service Worker"}),"\n",(0,s.jsxs)(r.p,{children:[(0,s.jsx)(r.code,{children:"Service Worker"})," \u7684\u4efb\u52a1\u901a\u5e38\u4e0e\u5145\u5f53\u7f51\u7edc\u4ee3\u7406\u3001\u5904\u7406\u540e\u53f0\u4efb\u52a1\u4ee5\u53ca\u7f13\u5b58\u548c\u79bb\u7ebf\u7b49\u76f8\u5173\u3002"]}),"\n",(0,s.jsx)(r.p,{children:"\u793a\u4f8b: \u5728\u64ad\u5ba2 PWA \u4e2d\uff0c\u53ef\u80fd\u5e0c\u671b\u5141\u8bb8\u7528\u6237\u4e0b\u8f7d\u5b8c\u6574\u7684\u5267\u96c6\u4ee5\u4fbf\u5728\u79bb\u7ebf\u65f6\u6536\u542c\u3002\u4e3a\u6b64\uff0c\u53ef\u4ee5\u4f7f\u7528\u670d\u52a1\u5de5\u4f5c\u8005\uff0c\u7279\u522b\u662f\u540e\u53f0\u83b7\u53d6 API\u3002\u8fd9\u6837\uff0c\u5982\u679c\u7528\u6237\u5728\u4e0b\u8f7d\u5267\u96c6\u65f6\u5173\u95ed\u9009\u9879\u5361\uff0c\u5219\u4e0d\u5fc5\u4e2d\u65ad\u4efb\u52a1\u3002"}),"\n",(0,s.jsx)(r.h2,{id:"4-\u5b9e\u73b0",children:"4. \u5b9e\u73b0"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsxs)(r.p,{children:["Web Worker: ",(0,s.jsx)(r.a,{href:"https://github.com/GoogleChromeLabs/comlink",children:"Comlink"})]}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsxs)(r.p,{children:["Service Worker: ",(0,s.jsx)(r.a,{href:"https://developer.chrome.com/docs/workbox/",children:"Workbox"}),"\u3002"]}),"\n"]}),"\n"]})]})}function j(e={}){const{wrapper:r}={...(0,o.a)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},4109:(e,r,n)=>{n.d(r,{Z:()=>l,a:()=>c});var s=n(5170);const o={},i=s.createContext(o);function c(e){const r=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),s.createElement(i.Provider,{value:r},e.children)}}}]);