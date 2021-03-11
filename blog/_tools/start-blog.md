---
title: 开始你的博客
summary: 快速开始属于你自己的博客
date: 2020-03-30
---

---

### 搭建博客

该博客是利用 VuePress 搭建，[文档在这](https://v1.vuepress.vuejs.org/zh/guide/)

### github 自定义域名配置

1. 在项目的根目录添加 CNAME 文件，其中包含一个顶级域名，像这样：

```bash
huteming.site
```

> 需要注意的是：如果是利用 Github Pages，发布打包后生成的静态目录文件夹（如 dist）到 github 分支，那个这个 CNAME 文件需要放到这个 dist 的目录下

2. 登录域名管理（如[阿里云](https://dc.console.aliyun.com/next/index#/domain/list/all-domain)）添加两条 CNAME 解析，如图：

![阿里云CNAME解析](/start-blog/cname.png)

3. 最后在 github 项目中配置 cname 解析，

![github settings](/start-blog/settings.png)
![github domain](/start-blog/domain.png)

### Travis-CI 自动部署

1. 在 Github 上创建一个 travis-ci 用的 GitHub Access Token，创建过程可以参考[官方文档](https://help.github.com/cn/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

2. 登录 [Travis-CI](https://travis-ci.com/account/repositories) 来同步你的 Github 账号的仓库

3. 启用博客项目

![travis-ci enable](/start-blog/travis-ci_enable.png)

4. 配置 travis-ci

将刚才创建的 Github Access Token 配置到 travis-ci

![travis-ci settings](/start-blog/travis-ci_settings.png)

5. 在项目根目录添加 .travis.yml 文件

> 注意文件名以 "." 开头。

> 这里使用的 deploy 是修改自官方提供的部署 GitHub Pages 使用的模板，[Travis 文档](https://docs.travis-ci.com/user/deployment/pages/)

```bash
language: node_js
node_js:
  - lts/*
install:
  - npm install --registry=https://registry.npm.taobao.org
script:
  - npm run build
  # 如果需要配置自定义域名，在 build 目录下创建 CNAME
  # - echo "huteming.site" > ./docs/.vuepress/dist/CNAME
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vuepress/dist
  github_token: $GITHUB_TOKEN
  keep_history: true
  # 触发部署分支
  on:
    branch: dev
  # 发布到指定分支，默认是 gh-pages
  target_branch: master
  # 自定义 commit message
  # commit_message: deploy
```
