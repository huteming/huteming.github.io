"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5358],{6987:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>u,frontMatter:()=>l,metadata:()=>d,toc:()=>i});var t=s(3010),a=s(4109);const l={tags:["ts"],image:"https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/e22aad950be236fec9db8f2aa660d0fd?_a=AQAEufR"},r=void 0,d={permalink:"/blog/TS Equals",source:"@site/blog/TS Equals.md",title:"TS Equals",description:"\u5728\u505a ts \u7c7b\u578b\u7ec3\u4e60\u7684\u65f6\u5019\uff0c\u78b0\u5230\u9700\u8981\u6bd4\u8f83\u4e24\u4e2a\u7c7b\u578b\u662f\u5426\u76f8\u540c\uff0c\u770b\u5230\u7b54\u6848\u91cc\u6709\u8fd9\u4e48\u4e00\u79cd\u65b9\u6cd5",date:"2024-01-23T08:59:39.000Z",formattedDate:"2024\u5e741\u670823\u65e5",tags:[{label:"ts",permalink:"/blog/tags/ts"}],readingTime:3.38,hasTruncateMarker:!1,authors:[],frontMatter:{tags:["ts"],image:"https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/e22aad950be236fec9db8f2aa660d0fd?_a=AQAEufR"},unlisted:!1,prevItem:{title:"prettier \u4e0e eslint \u7684\u96c6\u6210",permalink:"/blog/prettier \u4e0e eslint \u7684\u96c6\u6210"},nextItem:{title:"css\u5b9e\u73b0\u6587\u5b57\u4ea4\u878d",permalink:"/blog/css\u5b9e\u73b0\u6587\u5b57\u4ea4\u878d"}},c={authorsImageUrls:[]},i=[{value:"\u6cdb\u578b T \u662f\u4ec0\u4e48\u610f\u601d\uff1f",id:"\u6cdb\u578b-t-\u662f\u4ec0\u4e48\u610f\u601d",level:2},{value:"\u600e\u4e48\u7406\u89e3\u8fd9\u6bb5\u4ee3\u7801",id:"\u600e\u4e48\u7406\u89e3\u8fd9\u6bb5\u4ee3\u7801",level:2},{value:"\u7279\u6b8a\u60c5\u51b5",id:"\u7279\u6b8a\u60c5\u51b5",level:2},{value:"NativeEqual",id:"nativeequal",level:3},{value:"\u8054\u5408\u7c7b\u578b",id:"\u8054\u5408\u7c7b\u578b",level:3},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2}];function o(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["\u5728\u505a ",(0,t.jsx)(n.a,{href:"https://typehero.dev/explore",children:"ts \u7c7b\u578b\u7ec3\u4e60"}),"\u7684\u65f6\u5019\uff0c\u78b0\u5230\u9700\u8981\u6bd4\u8f83\u4e24\u4e2a\u7c7b\u578b\u662f\u5426\u76f8\u540c\uff0c\u770b\u5230\u7b54\u6848\u91cc\u6709\u8fd9\u4e48\u4e00\u79cd\u65b9\u6cd5"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"export type Equals<X, Y> =\n    (<T>() => T extends X ? 1 : 2) extends\n    (<T>() => T extends Y ? 1 : 2) ? true : false;\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u8fd9\u91cc\u7684\u6cdb\u578b T \u662f\u4ec0\u4e48\u610f\u601d\uff1f\u8fd9\u6bb5\u4ee3\u7801\u8be5\u600e\u4e48\u7406\u89e3\uff1f"}),"\n",(0,t.jsxs)(n.p,{children:["\u641c\u7d22\u5230\u6bd4\u8f83\u597d\u7684\u7b54\u6848\u5728",(0,t.jsx)(n.a,{href:"https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript",children:"\u8fd9\u91cc"}),"\uff0c\u4e5f\u987a\u4fbf\u8bb0\u5f55\u4e0b\u81ea\u5df1\u770b\u5b8c\u540e\u7684\u7406\u89e3"]}),"\n",(0,t.jsx)(n.h2,{id:"\u6cdb\u578b-t-\u662f\u4ec0\u4e48\u610f\u601d",children:"\u6cdb\u578b T \u662f\u4ec0\u4e48\u610f\u601d\uff1f"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"\u6ca1\u6709\u610f\u601d"}),"\uff01\uff01\u8fd9\u5c31\u662f\u4e00\u4e2a\u5b9a\u4e49\u7684\u6cdb\u578b\uff0c\u53ea\u662f\u6211\u4eec\u5e73\u65f6\u7528\u7684\u6bd4\u8f83\u591a\u7684\u662f\u50cf\u8fd9\u6837"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"type Identity<T> = (data: T) => T\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\u533a\u522b\u53ea\u662f\u4e0a\u9762\u8fd9\u6bb5\u4ee3\u7801\u5728\u6267\u884c\u65f6\u4f1a\u81ea\u52a8\u6839\u636e\u4f20\u5165\u7684 data \u7c7b\u578b\u63a8\u65ad T \u7684\u7c7b\u578b\uff0c\u800c Equal \u4e2d\u7684\u5199\u6cd5\u9700\u8981\u624b\u52a8\u4f20\u5165\uff0c\u9ed8\u8ba4\u662f ",(0,t.jsx)(n.code,{children:"unknown"}),"\uff0c\u6ca1\u6709\u4efb\u4f55\u7279\u6b8a\u7684\u542b\u4e49"]}),"\n",(0,t.jsx)(n.h2,{id:"\u600e\u4e48\u7406\u89e3\u8fd9\u6bb5\u4ee3\u7801",children:"\u600e\u4e48\u7406\u89e3\u8fd9\u6bb5\u4ee3\u7801"}),"\n",(0,t.jsxs)(n.p,{children:["Equal \u8fd9\u6bb5\u4ee3\u7801\u91cd\u70b9\u5728\u4e8e\u6bd4\u8f83\u4e24\u4e2a\u51fd\u6570 ",(0,t.jsx)(n.code,{children:"(<T>() => T extends X ? 1 : 2)"})," \u548c ",(0,t.jsx)(n.code,{children:"(<T>() => T extends Y ? 1 : 2)"})," \u662f\u5426\u76f8\u540c\u3002"]}),"\n",(0,t.jsx)(n.p,{children:"\u90a3\u4e48\u95ee\u9898\u5c31\u53d8\u6210 X \u548c Y \u662f\u5426\u76f8\u540c\u3002"}),"\n",(0,t.jsx)(n.p,{children:"\u5982\u679c X \u548c Y \u76f8\u540c\uff0c\u6ca1\u4ec0\u4e48\u597d\u8bf4\u7684\uff0c extends \u4e00\u5b9a\u6210\u7acb\uff1b\u5982\u679c\u4e0d\u540c\u65f6\uff0c\u90a3\u4e48\u6211\u4eec\u603b\u80fd\u627e\u5230\u4e00\u79cd\u7c7b\u578b\uff0c\u4f7f\u5f97\u7528\u5b83\u4f5c\u4e3a T \u65f6\uff0cextends \u4e0d\u6210\u7acb\u3002\u4ee3\u7801\u5982\u4e0b"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"declare let x: <T>() => T extends number ? 1 : 2\ndeclare let y: <T>() => T extends string ? 1 : 2\n\nconst a = x<string>() // 2\nconst b = x<number>() // 1\n\nconst c = y<string>() // 1\nconst d = y<number>() // 2\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"declare let x: <T>() => T extends { foo: string; bar: number } ? 1 : 2\ndeclare let y: <T>() => T extends { foo: string } ? 1 : 2\n\nconst a = x<{ foo: string }>() // 2\nconst b = y<{ foo: string }>() // 1\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u56e0\u6b64\u6211\u4eec\u5c31\u53ef\u4ee5\u7528\u5b83\u6765\u5224\u65ad X \u548c Y \u662f\u5426\u76f8\u540c\u3002"}),"\n",(0,t.jsx)(n.h2,{id:"\u7279\u6b8a\u60c5\u51b5",children:"\u7279\u6b8a\u60c5\u51b5"}),"\n",(0,t.jsx)(n.p,{children:"\u4ee5\u4e0a\u53ea\u662f\u89e3\u91ca\u4e86 Equal \u7684\u57fa\u672c\u539f\u7406\uff0cts \u5185\u90e8\u5b9e\u73b0\u53ef\u80fd\u8981\u590d\u6742\u7684\u591a\uff0c\u53ef\u80fd\u6709\u65f6\u5019\u4e3a\u4e86\u6027\u80fd\u6216\u8005\u4ec0\u4e48\u539f\u56e0\uff0c\u4f1a\u51fa\u73b0\u4e00\u4e9b\u548c\u5e38\u89c4\u8ba4\u8bc6\u4e0d\u4e00\u6837\u7684\u7ed3\u679c"}),"\n",(0,t.jsx)(n.h3,{id:"nativeequal",children:"NativeEqual"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"type NaiveEquals<X, Y> = X extends Y ? (Y extends X ? true : false) : false\n\ntype A = NaiveEquals<{ a?: number }, {}> // true\ntype B = Equals<{ a?: number }, {}> // false\n"})}),"\n",(0,t.jsxs)(n.p,{children:["\u7406\u8bba\u4e0a A \u4e5f\u5e94\u8be5\u662f false\uff0c\u56e0\u4e3a\u7c7b\u578b ",(0,t.jsx)(n.code,{children:"{a: string}"})," \u53ef\u5206\u914d\u7ed9 "," \uff0c\u4f46\u4e0d\u80fd\u5206\u914d\u7ed9 ",(0,t.jsx)(n.code,{children:"{a?: number}"})]}),"\n",(0,t.jsx)(n.h3,{id:"\u8054\u5408\u7c7b\u578b",children:"\u8054\u5408\u7c7b\u578b"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"type A = Equals<{ x: 1 } & { y: 2 }, { x: 1; y: 2 }> // false\n"})}),"\n",(0,t.jsx)(n.p,{children:"\u7406\u8bba\u4e0a\u8fd9\u91cc A \u5e94\u8be5\u662f true\uff0c\u4f46\u7ed3\u679c\u5374\u662f false\uff0c\u4e86\u89e3\u4e0d\u4e86\uff0c\u4f46\u662f\u4e8b\u5b9e\u3002"}),"\n",(0,t.jsx)(n.h2,{id:"\u603b\u7ed3",children:"\u603b\u7ed3"}),"\n",(0,t.jsx)(n.p,{children:"Equal \u5f53\u4f5c\u65e5\u5e38\u4f7f\u7528\u5e94\u8be5\u662f\u6ca1\u95ee\u9898\u7684\uff0c\u7279\u6b8a\u60c5\u51b5\u6211\u89c9\u5f97\u5b8c\u5168\u53ef\u4ee5\u5f53\u4f5c\u8865\u5145\u77e5\u8bc6\u53bb\u4e86\u89e3\u4e0b\u3002"}),"\n",(0,t.jsxs)(n.p,{children:["\u518d\u6b21\u8bf4\u660e\uff0c\u539f\u6587\u5728",(0,t.jsx)(n.a,{href:"https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript",children:"\u8fd9\u91cc"}),"\u3002"]})]})}function u(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},4109:(e,n,s)=>{s.d(n,{Z:()=>d,a:()=>r});var t=s(5170);const a={},l=t.createContext(a);function r(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);