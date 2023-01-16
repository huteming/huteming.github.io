const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const math = require('remark-math')
const katex = require('rehype-katex')
const directories = require('./directories')

const TITLE = '特_明'

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: TITLE,
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
  },

  themes: ['@docusaurus/theme-live-codeblock'],
}
