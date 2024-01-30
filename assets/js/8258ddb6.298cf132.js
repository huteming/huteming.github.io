"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[217],{4875:(A,e,n)=>{n.r(e),n.d(e,{assets:()=>r,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>m,toc:()=>h});var t=n(3010),c=n(4109);const s={},a=void 0,m={id:"http/Basic Authentication",title:"Basic Authentication",description:"HTTP \u672c\u8eab\u63d0\u4f9b\u4e00\u4e2a\u7528\u4e8e\u6743\u9650\u63a7\u5236\u548c\u8ba4\u8bc1\u7684\u901a\u7528\u6846\u67b6, MDN HTTP \u8eab\u4efd\u9a8c\u8bc1",source:"@site/docs/http/Basic Authentication.md",sourceDirName:"http",slug:"/http/Basic Authentication",permalink:"/docs/http/Basic Authentication",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"\u9009\u62e9\u5668\u548c\u4f18\u5148\u7ea7",permalink:"/docs/css/\u9009\u62e9\u5668\u548c\u4f18\u5148\u7ea7"},next:{title:"CDN",permalink:"/docs/http/CDN"}},r={},h=[{value:"\u901a\u7528\u7684 HTTP \u8ba4\u8bc1\u6846\u67b6",id:"\u901a\u7528\u7684-http-\u8ba4\u8bc1\u6846\u67b6",level:2},{value:"WWW-Authenticate",id:"www-authenticate",level:2},{value:"\u8bed\u6cd5",id:"\u8bed\u6cd5",level:3},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",level:2}];function i(A){const e={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",...(0,c.a)(),...A.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(e.p,{children:["HTTP \u672c\u8eab\u63d0\u4f9b\u4e00\u4e2a\u7528\u4e8e\u6743\u9650\u63a7\u5236\u548c\u8ba4\u8bc1\u7684\u901a\u7528\u6846\u67b6, ",(0,t.jsx)(e.a,{href:"https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication",children:"MDN HTTP \u8eab\u4efd\u9a8c\u8bc1"})]}),"\n",(0,t.jsx)(e.h2,{id:"\u901a\u7528\u7684-http-\u8ba4\u8bc1\u6846\u67b6",children:"\u901a\u7528\u7684 HTTP \u8ba4\u8bc1\u6846\u67b6"}),"\n",(0,t.jsxs)(e.p,{children:["\u5b83\u662f\u57fa\u4e8e",(0,t.jsx)(e.a,{href:"https://developer.mozilla.org/zh-CN/docs/Glossary/Challenge",children:"\u8d28\u8be2\u2014\u54cd\u5e94\u8ba4\u8bc1\u534f\u8bae"}),"\u7684"]}),"\n",(0,t.jsx)(e.p,{children:"\u8d28\u8be2\u4e0e\u54cd\u5e94\u7684\u5de5\u4f5c\u6d41\u7a0b\u5982\u4e0b\uff1a"}),"\n",(0,t.jsxs)(e.ol,{children:["\n",(0,t.jsxs)(e.li,{children:["\u670d\u52a1\u5668\u7aef\u5411\u5ba2\u6237\u7aef\u8fd4\u56de 401\uff08Unauthorized\uff0c\u672a\u88ab\u6388\u6743\u7684\uff09\u54cd\u5e94\u72b6\u6001\u7801\uff0c\u5e76\u5728 ",(0,t.jsx)(e.code,{children:"WWW-Authenticate"})," \u54cd\u5e94\u6807\u5934\u63d0\u4f9b\u5982\u4f55\u8fdb\u884c\u9a8c\u8bc1\u7684\u4fe1\u606f\uff0c\u5176\u4e2d\u81f3\u5c11\u5305\u542b\u6709\u4e00\u79cd\u8d28\u8be2\u65b9\u5f0f\u3002"]}),"\n",(0,t.jsxs)(e.li,{children:["\u4e4b\u540e\uff0c\u60f3\u8981\u4f7f\u7528\u670d\u52a1\u5668\u5bf9\u81ea\u5df1\u8eab\u4efd\u8fdb\u884c\u9a8c\u8bc1\u7684\u5ba2\u6237\u7aef\uff0c\u53ef\u4ee5\u901a\u8fc7\u5305\u542b\u51ed\u636e\u7684 ",(0,t.jsx)(e.code,{children:"Authorization"})," \u8bf7\u6c42\u6807\u5934\u8fdb\u884c\u9a8c\u8bc1\u3002"]}),"\n",(0,t.jsxs)(e.li,{children:["\u901a\u5e38\uff0c\u5ba2\u6237\u7aef\u4f1a\u5411\u7528\u6237\u663e\u793a\u5bc6\u7801\u63d0\u793a\uff0c\u7136\u540e\u53d1\u9001\u5305\u542b\u6b63\u786e\u7684 ",(0,t.jsx)(e.code,{children:"Authorization"})," \u6807\u5934\u7684\u8bf7\u6c42\u3002"]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{alt:"http-auth-sequence-diagram",src:n(2573).Z+"",width:"713",height:"407"})}),"\n",(0,t.jsx)(e.admonition,{type:"caution",children:(0,t.jsx)(e.p,{children:"\u8fd9\u79cd\u8eab\u4efd\u9a8c\u8bc1\u65b9\u6848\u4f1a\u5bf9\u51ed\u636e\u8fdb\u884c\u7f16\u7801\uff0c\u4f46\u662f\u5e76\u4e0d\u4f1a\u8fdb\u884c\u52a0\u5bc6\u3002\u9664\u975e\u4fe1\u606f\u4ea4\u6362\u901a\u8fc7\u5b89\u5168\u7684\u8fde\u63a5\uff08HTTPS/TLS\uff09\uff0c\u5426\u5219\u8fd9\u4ef6\u4e8b\u6781\u5176\u4e0d\u5b89\u5168\u7684\u3002"})}),"\n",(0,t.jsx)(e.h2,{id:"www-authenticate",children:"WWW-Authenticate"}),"\n",(0,t.jsx)(e.h3,{id:"\u8bed\u6cd5",children:"\u8bed\u6cd5"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-bash",children:"WWW-Authenticate: <auth-scheme> realm=<realm>, challenge1, ...challengeN\n"})}),"\n",(0,t.jsx)(e.h2,{id:"\u793a\u4f8b",children:"\u793a\u4f8b"}),"\n",(0,t.jsx)(e.p,{children:"\u5728 express \u4e2d\u4e00\u6bb5\u7b80\u5355\u7684\u793a\u4f8b\u4ee3\u7801"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-js",children:"router.get('/auth', function (req, res, next) {\n  const authStr = req.get('Authorization') || ''\n  const [, data] = authStr.split(' ')\n\n  if (!data) {\n    return res\n      .set({\n        'WWW-Authenticate': 'Basic realm=\"Access to the staging site\"',\n      })\n      .status(401)\n      .end()\n  }\n\n  const [username, password] = Buffer.from(data, 'base64').toString('utf-8').split(':')\n\n  if (!username || !password) {\n    return res\n      .set({\n        'WWW-Authenticate': 'Basic realm=\"Access to the staging site\"',\n      })\n      .status(403)\n      .end()\n  }\n\n  return res.send('auth success')\n})\n"})}),"\n",(0,t.jsx)(e.p,{children:(0,t.jsx)(e.img,{alt:"http-auth-sample",src:n(5558).Z+"",width:"2970",height:"1056"})})]})}function u(A={}){const{wrapper:e}={...(0,c.a)(),...A.components};return e?(0,t.jsx)(e,{...A,children:(0,t.jsx)(i,{...A})}):i(A)}},5558:(A,e,n)=>{n.d(e,{Z:()=>t});const t=n.p+"assets/images/example-51fd295f804ca7eca56e3646b9ffba50.png"},2573:(A,e,n)=>{n.d(e,{Z:()=>t});const t="data:image/png;base64,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"},4109:(A,e,n)=>{n.d(e,{Z:()=>m,a:()=>a});var t=n(5170);const c={},s=t.createContext(c);function a(A){const e=t.useContext(s);return t.useMemo((function(){return"function"==typeof A?A(e):{...e,...A}}),[e,A])}function m(A){let e;return e=A.disableParentContext?"function"==typeof A.components?A.components(c):A.components||c:a(A.components),t.createElement(s.Provider,{value:e},A.children)}}}]);