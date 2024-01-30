"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2677],{3269:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>s,metadata:()=>c,toc:()=>o});var i=n(3010),r=n(4109);const s={tags:["git"]},l=void 0,c={permalink:"/blog/\u5220\u9664commit",source:"@site/blog/\u5220\u9664commit.md",title:"\u5220\u9664commit",description:"\u5982\u679c\u9700\u8981\u5220\u9664\u7684\u4e0d\u53ea\u662f\u67d0\u4e2a\u6587\u4ef6\uff0c\u800c\u662f\u4ea4\u9519\u7684\u4ee3\u7801\uff0c\u90a3\u4e48\u6709\u4ee5\u4e0b\u4e09\u79cd\u65b9\u6cd5\u53ef\u4ee5\u5220\u9664 commit \u3002",date:"2024-01-25T11:10:58.000Z",formattedDate:"2024\u5e741\u670825\u65e5",tags:[{label:"git",permalink:"/blog/tags/git"}],readingTime:2.09,hasTruncateMarker:!1,authors:[],frontMatter:{tags:["git"]},unlisted:!1,prevItem:{title:"CAS",permalink:"/blog/CAS"},nextItem:{title:"\u6587\u672c\u6362\u884c",permalink:"/blog/\u6587\u672c\u6362\u884c"}},a={authorsImageUrls:[]},o=[{value:"git reset",id:"git-reset",level:2},{value:"1. \u56de\u6eda\u4ee3\u7801",id:"1-\u56de\u6eda\u4ee3\u7801",level:3},{value:"2. \u8bef\u5220\u6062\u590d",id:"2-\u8bef\u5220\u6062\u590d",level:3},{value:"git rebase",id:"git-rebase",level:2},{value:"git revert",id:"git-revert",level:2}];function d(e){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"\u5982\u679c\u9700\u8981\u5220\u9664\u7684\u4e0d\u53ea\u662f\u67d0\u4e2a\u6587\u4ef6\uff0c\u800c\u662f\u4ea4\u9519\u7684\u4ee3\u7801\uff0c\u90a3\u4e48\u6709\u4ee5\u4e0b\u4e09\u79cd\u65b9\u6cd5\u53ef\u4ee5\u5220\u9664 commit \u3002"}),"\n",(0,i.jsx)(t.h2,{id:"git-reset",children:"git reset"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"git reset \uff1a\u56de\u6eda\u5230\u67d0\u6b21\u63d0\u4ea4\u3002"}),"\n",(0,i.jsx)(t.li,{children:"git reset --soft\uff1a\u6b64\u6b21\u63d0\u4ea4\u4e4b\u540e\u7684\u4fee\u6539\u4f1a\u88ab\u9000\u56de\u5230\u6682\u5b58\u533a\u3002"}),"\n",(0,i.jsx)(t.li,{children:"git reset --hard\uff1a\u6b64\u6b21\u63d0\u4ea4\u4e4b\u540e\u7684\u4fee\u6539\u4e0d\u505a\u4efb\u4f55\u4fdd\u7559\uff0cgit status \u67e5\u770b\u5de5\u4f5c\u533a\u662f\u6ca1\u6709\u8bb0\u5f55\u7684\u3002"}),"\n"]}),"\n",(0,i.jsx)(t.h3,{id:"1-\u56de\u6eda\u4ee3\u7801",children:"1. \u56de\u6eda\u4ee3\u7801"}),"\n",(0,i.jsx)(t.p,{children:"\u5982\u679c\u9700\u8981\u5220\u9664\u7684 commit \u662f\u6700\u65b0\u7684\uff0c\u90a3\u4e48\u53ef\u4ee5\u901a\u8fc7 git reset \u547d\u4ee4\u5c06\u4ee3\u7801\u56de\u6eda\u5230\u4e4b\u524d\u67d0\u6b21\u63d0\u4ea4\u7684\u72b6\u6001\uff0c\u4f46\u4e00\u5b9a\u8981\u5c06\u73b0\u6709\u7684\u4ee3\u7801\u505a\u597d\u5907\u4efd\uff0c\u5426\u5219\u56de\u6eda\u4e4b\u540e\u8fd9\u4e9b\u53d8\u52a8\u90fd\u4f1a\u6d88\u5931\u3002\u5177\u4f53\u64cd\u4f5c\u5982\u4e0b\uff1a"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"# HEAD \u5c31\u4f1a\u6307\u5411\u6b64\u6b21\u7684\u63d0\u4ea4\u8bb0\u5f55\ngit reset --hard commit_id\n\n# \u5f3a\u5236\u63a8\u9001\u5230\u8fdc\u7aef\ngit push origin HEAD --force\n"})}),"\n",(0,i.jsx)(t.h3,{id:"2-\u8bef\u5220\u6062\u590d",children:"2. \u8bef\u5220\u6062\u590d"}),"\n",(0,i.jsx)(t.p,{children:"\u5982\u679c\u56de\u6eda\u4ee3\u7801\u4e4b\u540e\u53d1\u73b0\u590d\u5236\u9519\u4e86 commit_id\uff0c\u6216\u8005\u8bef\u5220\u4e86\u67d0\u6b21 commit \u8bb0\u5f55\uff0c\u4e5f\u53ef\u4ee5\u901a\u8fc7\u4e0b\u65b9\u4ee3\u7801\u6062\u590d\uff1a"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"# \u590d\u5236\u8981\u6062\u590d\u64cd\u4f5c\u7684\u524d\u9762\u7684 hash \u503c\ngit relog\n\n# \u5c06 hash \u6362\u6210\u8981\u6062\u590d\u7684\u5386\u53f2\u8bb0\u5f55\u7684 hash \u503c\ngit reset --hard hash\n"})}),"\n",(0,i.jsx)(t.h2,{id:"git-rebase",children:"git rebase"}),"\n",(0,i.jsx)(t.p,{children:"\u5982\u679c\u4e2d\u95f4\u7684\u67d0\u6b21 commit \u9700\u8981\u5220\u9664\uff0c\u53ef\u4ee5\u901a\u8fc7 git rebase \u547d\u4ee4\u5b9e\u73b0\uff0c\u65b9\u6cd5\u5982\u4e0b\uff1a"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"# \u5c06 commit_id \u66ff\u6362\u6210\u8981\u5220\u9664\u7684 \u524d\u4e00\u6b21 \u63d0\u4ea4\u7684 commit_id\ngit rebase -i commit_id\n\n\u8fdb\u5165 Vim \u7f16\u8f91\u6a21\u5f0f\uff0c\u5c06\u8981\u5220\u9664\u7684 commit \u524d\u9762\u7684 `pick` \u6539\u6210 `drop`\n\n\u4fdd\u5b58\u5e76\u9000\u51fa Vim\n"})}),"\n",(0,i.jsx)(t.h2,{id:"git-revert",children:"git revert"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["get revert: \u653e\u5f03\u67d0\u6b21\u63d0\u4ea4\u3002",(0,i.jsx)(t.strong,{children:"\u4e4b\u524d\u7684\u63d0\u4ea4\u4ecd\u4f1a\u4fdd\u7559\u5728 git log \u4e2d\uff0c\u800c\u6b64\u6b21\u64a4\u9500\u4f1a\u505a\u4e3a\u4e00\u6b21\u65b0\u7684\u63d0\u4ea4\u3002"})]}),"\n"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"# \u64a4\u9500\u8fd9\u6b21\u63d0\u4ea4\ngit revert commit_id\n"})})]})}function h(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},4109:(e,t,n)=>{n.d(t,{Z:()=>c,a:()=>l});var i=n(5170);const r={},s=i.createContext(r);function l(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);