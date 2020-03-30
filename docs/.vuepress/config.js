module.exports = {
  title: '特明的日志',
  description: '',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '开始你的博客', link: '/start-blog/' },
      // {
      //   text: '手写实现',
      //   items: [
      //     { text: 'Chinese', link: '/language/chinese' },
      //   ]
      // }
    ],

    // 页面底部显示最后更新时间
    lastUpdated: 'Last Updated', // string | boolean

    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'huteming.github.io',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    // docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '去 Github 指出我的错误！',
  },
}
