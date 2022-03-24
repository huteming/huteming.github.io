const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '特明',
  url: process.env.URL || 'https://huteming.github.io', // 您的网站网址
  baseUrl: '/', // 站点的相对路径
  onBrokenLinks: 'throw', // 检测到无效链接时的行为
  onBrokenMarkdownLinks: 'warn', // 在检测到无效 Markdown 链接时的行为
  favicon: 'img/favicon.ico',
  organizationName: 'huteming', // 拥有此源的 GitHub 用户或组织。 用于部署命令。
  projectName: 'huteming.github.io', // GitHub 源的名称。 用于部署命令。
  trailingSlash: false, // 允许您自定义 URL/链接后是否添加结尾斜杠。
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
        },
        blog: {
          routeBasePath: '/',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Blog Posts',
          showReadingTime: true,
        },
        theme: {
          customCss: [
            require.resolve('./src/css/customTheme.scss'),
            require.resolve('./src/css/index.scss'),
            require.resolve('./src/css/showcase.scss'),
            require.resolve('./src/css/versions.scss'),
            require.resolve('./src/css/atom.scss'),
            // require.resolve('./src/css/custom.css'),
          ],
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: '笔记',
      style: 'dark', // dark | primary
      items: [
        {
          type: 'doc',
          docId: 'react/changelog',
          position: 'right',
          label: 'React',
        },
        // { to: '/blog', label: '最近', position: 'right' },
      ],
    },
    prism: {
      theme: darkCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: ['docusaurus-plugin-sass'],
}
