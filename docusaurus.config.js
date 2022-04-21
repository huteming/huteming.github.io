const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const math = require('remark-math')
const katex = require('rehype-katex')

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
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
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
        {
          type: 'doc',
          docId: 'javascript/reflect',
          position: 'right',
          label: 'Javascript',
        },
        {
          type: 'doc',
          docId: 'css/水平垂直居中',
          position: 'right',
          label: 'CSS',
        },
        {
          type: 'doc',
          docId: 'http/响应状态码',
          position: 'right',
          label: 'HTTP',
        },
        {
          type: 'doc',
          docId: 'performance/性能指标',
          position: 'right',
          label: 'Web 性能',
        },
        {
          type: 'doc',
          docId: 'security/常见攻击类型',
          position: 'right',
          label: 'Web 安全',
        },
        {
          type: 'doc',
          docId: 'helper/compose',
          position: 'right',
          label: '函数',
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
