(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{386:function(t,s,a){"use strict";a.r(s);var e=a(9),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("hr"),t._v(" "),a("h3",{attrs:{id:"搭建博客"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#搭建博客"}},[t._v("#")]),t._v(" 搭建博客")]),t._v(" "),a("p",[t._v("该博客是利用 VuePress 搭建，"),a("a",{attrs:{href:"https://v1.vuepress.vuejs.org/zh/guide/",target:"_blank",rel:"noopener noreferrer"}},[t._v("文档在这"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"github-自定义域名配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#github-自定义域名配置"}},[t._v("#")]),t._v(" github 自定义域名配置")]),t._v(" "),a("ol",[a("li",[t._v("在项目的根目录添加 CNAME 文件，其中包含一个顶级域名，像这样：")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("huteming.site\n")])])]),a("blockquote",[a("p",[t._v("需要注意的是：如果是利用 Github Pages，发布打包后生成的静态目录文件夹（如 dist）到 github 分支，那个这个 CNAME 文件需要放到这个 dist 的目录下")])]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("登录域名管理（如"),a("a",{attrs:{href:"https://dc.console.aliyun.com/next/index#/domain/list/all-domain",target:"_blank",rel:"noopener noreferrer"}},[t._v("阿里云"),a("OutboundLink")],1),t._v("）添加两条 CNAME 解析，如图：")])]),t._v(" "),a("p",[a("img",{attrs:{src:"/start-blog/cname.png",alt:"阿里云CNAME解析"}})]),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[t._v("最后在 github 项目中配置 cname 解析，")])]),t._v(" "),a("p",[a("img",{attrs:{src:"/start-blog/settings.png",alt:"github settings"}}),t._v(" "),a("img",{attrs:{src:"/start-blog/domain.png",alt:"github domain"}})]),t._v(" "),a("h3",{attrs:{id:"travis-ci-自动部署"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#travis-ci-自动部署"}},[t._v("#")]),t._v(" Travis-CI 自动部署")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("在 Github 上创建一个 travis-ci 用的 GitHub Access Token，创建过程可以参考"),a("a",{attrs:{href:"https://help.github.com/cn/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line",target:"_blank",rel:"noopener noreferrer"}},[t._v("官方文档"),a("OutboundLink")],1)])]),t._v(" "),a("li",[a("p",[t._v("登录 "),a("a",{attrs:{href:"https://travis-ci.com/account/repositories",target:"_blank",rel:"noopener noreferrer"}},[t._v("Travis-CI"),a("OutboundLink")],1),t._v(" 来同步你的 Github 账号的仓库")])]),t._v(" "),a("li",[a("p",[t._v("启用博客项目")])])]),t._v(" "),a("p",[a("img",{attrs:{src:"/start-blog/travis-ci_enable.png",alt:"travis-ci enable"}})]),t._v(" "),a("ol",{attrs:{start:"4"}},[a("li",[t._v("配置 travis-ci")])]),t._v(" "),a("p",[t._v("将刚才创建的 Github Access Token 配置到 travis-ci")]),t._v(" "),a("p",[a("img",{attrs:{src:"/start-blog/travis-ci_settings.png",alt:"travis-ci settings"}})]),t._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[t._v("在项目根目录添加 .travis.yml 文件")])]),t._v(" "),a("blockquote",[a("p",[t._v('注意文件名以 "." 开头。')])]),t._v(" "),a("blockquote",[a("p",[t._v("这里使用的 deploy 是修改自官方提供的部署 GitHub Pages 使用的模板，"),a("a",{attrs:{href:"https://docs.travis-ci.com/user/deployment/pages/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Travis 文档"),a("OutboundLink")],1)])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("language: node_js\nnode_js:\n  - lts/*\ninstall:\n  - "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --registry"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("https://registry.npm.taobao.org\nscript:\n  - "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run build\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 如果需要配置自定义域名，在 build 目录下创建 CNAME")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# - echo "huteming.site" > ./docs/.vuepress/dist/CNAME')]),t._v("\ndeploy:\n  provider: pages\n  skip_cleanup: "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n  local_dir: docs/.vuepress/dist\n  github_token: "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$GITHUB_TOKEN")]),t._v("\n  keep_history: "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 触发部署分支")]),t._v("\n  on:\n    branch: dev\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 发布到指定分支，默认是 gh-pages")]),t._v("\n  target_branch: master\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 自定义 commit message")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# commit_message: deploy")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);