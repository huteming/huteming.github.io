module.exports = {
  title: '特明的日志',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  plugins: [
    // 自定义容器: https://v1.vuepress.vuejs.org/zh/guide/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8
    // 自定义容器: 引用
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ' ',
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'theorem',
        before: info => `<div class="theorem"><p class="title">${info}</p>`,
        after: '</div>',
      },
    ],
    // 自定义容器: 状态提示
    [
      'vuepress-plugin-container',
      {
        type: 'tip',
        defaultTitle: {
          '/': '提示',
        },
      },
    ],
    // 谷歌分析
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-139065266-1' // UA-00000000-0
      }
    ],
    // 评论系统 valine
    // https://valine.js.org/vuepress.html
    // [
    //   'vuepress-plugin-comment',
    //   {
    //     choosen: 'valine', 
    //     // options选项中的所有参数，会传给Valine的配置
    //     options: {
    //       el: '#valine-vuepress',
    //       appId: 'oPQ3dJVj0Ltg62BaVlONulv3-gzGzoHsz',
    //       appKey: 'Fo3CGQAkNSqxmtx8WsHuozdX',
    //       visitor: true, // 阅读量统计
    //     }
    //   }
    // ],
    // 自定义组件
    [
      '@vuepress/register-components',
      {
        componentsDir: './components',
      }
    ],
  ],

  theme: '@vuepress/theme-blog',
  themeConfig: {
    dateFormat: 'YYYY-MM-DD',
    nav: [
      { text: '编程', link: '/' },
      { text: '算法', link: '/algorithm/' },
      { text: '知识点', link: '/knowledge/' },
      { text: '原理解析', link: '/theories/' },
      { text: '工具指南', link: '/tools/' },
    ],
    directories: [
      {
        id: 'algorithm',
        dirname: '_algorithm',
        path: '/algorithm/',
        title: '算法',
        itemPermalink: '/algorithm/:slug',
      },
      {
        id: 'knowledge',
        dirname: '_knowledge',
        path: '/knowledge/',
        title: '知识点',
        itemPermalink: '/knowledge/:slug',
      },
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
      hostname: 'https://blog.huteming.site',
    },
  },
}
