const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const math = require('remark-math')
const katex = require('rehype-katex')

// const directories = require('./directories')
const fs = require('fs')
// 为了取消缓存，实现 directories 更新后刷新页面
const directories = JSON.parse(fs.readFileSync('./directories.json'))

const TITLE = '特_明'

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: TITLE,
  tagline: '一点点记录',
  url: process.env.URL || 'https://huteming.github.io', // 您的网站网址
  baseUrl: '/', // 站点的相对路径
  onBrokenLinks: 'throw', // 检测到无效链接时的行为
  onBrokenMarkdownLinks: 'warn', // 在检测到无效 Markdown 链接时的行为
  favicon: 'img/site/favicon.ico',
  trailingSlash: false, // 允许您自定义 URL/链接后是否添加结尾斜杠。

  organizationName: 'huteming', // 拥有此源的 GitHub 用户或组织。 用于部署命令。
  projectName: 'huteming.github.io', // GitHub 源的名称。 用于部署命令。

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // markdown 支持数学公式
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          routeBasePath: '/',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Blog Posts',
          showReadingTime: true,
        },
        theme: {
          customCss: [
            require.resolve('./src/css/atom.css'),
            require.resolve('./src/css/custom-v2.2.0.css'),
          ],
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: TITLE,
      logo: {
        alt: 'Logo',
        src: 'img/site/logo.svg',
      },
      items: directories.map(({ label, docId }) => ({
        type: 'doc',
        position: 'right',
        label,
        docId,
      })),
    },

    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },

    // Algolia DocSearch
    algolia: {
      appId: 'VVTGI6SZFO',
      apiKey: '8f32feb4e84eed874cb1d805e3aeba9e',
      indexName: 'huteming',
      contextualSearch: true,

      // 可选：声明哪些域名需要用 window.location 型的导航而不是 history.push。
      // 适用于 Algolia 配置会爬取多个文档站点，而我们想要用 window.location.href 在它们之间跳转时。
      // externalUrlRegex: 'blog\\.huteming\\.fun|huteming\\.github\\.io',

      // Optional: Replace parts of the item URLs from Algolia.
      // Useful when using the same search index for multiple deployments using a different baseUrl.
      // You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      // replaceSearchResultPathname: {
      //   from: '/docs/', // or as RegExp: /\/docs\//
      //   to: '/',
      // },

      // Optional: Algolia search parameters
      searchParameters: {},
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',
    },
  },

  themes: ['@docusaurus/theme-live-codeblock'],

  plugins: ['./src/plugins/watch-file'],
}
