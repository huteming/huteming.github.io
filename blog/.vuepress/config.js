module.exports = {
  title: '特明的日志',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  theme: '@vuepress/theme-blog',
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',
    nav: [
      { text: '编程', link: '/' },
      { text: '原理解析', link: '/theories/' },
      { text: '工具指南', link: '/tools/' },
      // {
      //   text: '手写实现',
      //   items: [
      //     { text: 'Chinese', link: '/language/chinese' },
      //   ]
      // }
    ],
    directories: [
      {
        id: 'coding',
        dirname: '_coding',
        path: '/',
        title: '编程',
        itemPermalink: '/coding/:slug',
      },
      {
        id: 'theories',
        dirname: '_theories',
        path: '/theories/',
        title: '原理解析',
        itemPermalink: '/theories/:slug',
      },
      {
        id: 'tools',
        dirname: '_tools',
        path: '/tools/',
        title: '工具指南',
        itemPermalink: '/tools/:slug',
      },
    ],
    globalPagination: {
      lengthPerPage: 5,
    },
    sitemap: {
      hostname: 'https://huteming.site',
    },

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
