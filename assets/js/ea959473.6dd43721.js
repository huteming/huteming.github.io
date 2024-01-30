"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5831],{4e3:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>i,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=s(3010),t=s(4109);const a={tags:["html"]},o=void 0,l={permalink:"/blog/\u6d4f\u89c8\u5668\u539f\u751f\u652f\u6301 ES6 \u6a21\u5757",source:"@site/blog/\u6d4f\u89c8\u5668\u539f\u751f\u652f\u6301 ES6 \u6a21\u5757.md",title:"\u6d4f\u89c8\u5668\u539f\u751f\u652f\u6301 ES6 \u6a21\u5757",description:"MDN \u8be6\u7ec6\u4ecb\u7ecd",date:"2024-01-23T08:59:39.000Z",formattedDate:"2024\u5e741\u670823\u65e5",tags:[{label:"html",permalink:"/blog/tags/html"}],readingTime:.98,hasTruncateMarker:!1,authors:[],frontMatter:{tags:["html"]},unlisted:!1,prevItem:{title:"css\u5b9e\u73b0\u6587\u5b57\u4ea4\u878d",permalink:"/blog/css\u5b9e\u73b0\u6587\u5b57\u4ea4\u878d"}},i={authorsImageUrls:[]},c=[{value:"\u4e0d\u80fd\u4f7f\u7528\u88f8\u9732\u7684\u6a21\u5757\u8bf4\u660e\u7b26",id:"\u4e0d\u80fd\u4f7f\u7528\u88f8\u9732\u7684\u6a21\u5757\u8bf4\u660e\u7b26",level:2},{value:"\u603b\u662f CORS \u8de8\u57df",id:"\u603b\u662f-cors-\u8de8\u57df",level:2},{value:"\u9ed8\u8ba4 Defer \u884c\u4e3a",id:"\u9ed8\u8ba4-defer-\u884c\u4e3a",level:2},{value:"\u6a21\u5757\u53ea\u4f1a\u6267\u884c\u4e00\u6b21",id:"\u6a21\u5757\u53ea\u4f1a\u6267\u884c\u4e00\u6b21",level:2},{value:"\u9650\u5b9a\u4f5c\u7528\u57df",id:"\u9650\u5b9a\u4f5c\u7528\u57df",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",children:"MDN \u8be6\u7ec6\u4ecb\u7ecd"})}),"\n",(0,r.jsx)(n.h2,{id:"\u4e0d\u80fd\u4f7f\u7528\u88f8\u9732\u7684\u6a21\u5757\u8bf4\u660e\u7b26",children:"\u4e0d\u80fd\u4f7f\u7528\u88f8\u9732\u7684\u6a21\u5757\u8bf4\u660e\u7b26"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"// Bad: \u8fd9\u6837\u662f\u9519\u8bef\u7684\u5199\u6cd5\uff0c\u4e0d\u652f\u6301\u7684\nimport { name as squareNameOne } from 'shapes'\nimport { name as squareNameTwo } from 'shapes/square'\n\n// Good: \u5e94\u8be5\u8fd9\u6837\u5b50\nimport { name as squareName, draw } from './shapes/square.js'\nimport { name as squareName, draw } from '/shapes/square.js'\nimport { name as circleName } from 'https://example.com/shapes/circle.js'\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u4e0d\u652f\u6301\uff0c\u4f46\u662f\u53ef\u4ee5\u901a\u8fc7\u5b9a\u4e49 ",(0,r.jsx)(n.strong,{children:"\u5bfc\u5165\u6620\u5c04"})," \u6765\u5b9e\u73b0\u3002",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#importing_modules_using_import_maps",children:"\u67e5\u770b\u8be6\u7ec6\u6587\u6863"})]}),"\n",(0,r.jsx)(n.h2,{id:"\u603b\u662f-cors-\u8de8\u57df",children:"\u603b\u662f CORS \u8de8\u57df"}),"\n",(0,r.jsx)(n.h2,{id:"\u9ed8\u8ba4-defer-\u884c\u4e3a",children:"\u9ed8\u8ba4 Defer \u884c\u4e3a"}),"\n",(0,r.jsx)(n.h2,{id:"\u6a21\u5757\u53ea\u4f1a\u6267\u884c\u4e00\u6b21",children:"\u6a21\u5757\u53ea\u4f1a\u6267\u884c\u4e00\u6b21"}),"\n",(0,r.jsx)(n.h2,{id:"\u9650\u5b9a\u4f5c\u7528\u57df",children:"\u9650\u5b9a\u4f5c\u7528\u57df"}),"\n",(0,r.jsxs)(n.p,{children:["\u6a21\u5757\u529f\u80fd\u88ab\u5bfc\u5165\u5230\u5355\u4e2a\u811a\u672c\u7684\u8303\u56f4\u5185, ",(0,r.jsx)(n.strong,{children:"\u5b83\u4eec\u5728\u5168\u5c40\u8303\u56f4\u5185\u4e0d\u53ef\u7528"}),"\u3002"]}),"\n",(0,r.jsx)(n.p,{children:"\u56e0\u6b64\uff0c\u60a8\u53ea\u80fd\u5728\u5bfc\u5165\u7684\u811a\u672c\u4e2d\u8bbf\u95ee\u5bfc\u5165\u7684\u529f\u80fd\uff0c\u800c\u65e0\u6cd5\u4ece JavaScript \u63a7\u5236\u53f0\u8bbf\u95ee\u5b83\u4eec\u3002"})]})}function m(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},4109:(e,n,s)=>{s.d(n,{Z:()=>l,a:()=>o});var r=s(5170);const t={},a=r.createContext(t);function o(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);