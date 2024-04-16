import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import dayjs from 'dayjs'

const TITLE = '特_明'

const config: Config = {
  title: TITLE,
  tagline: '一点点记录', // 网站标语
  favicon: 'site/logo/favicon.ico',

  // Set the production url of your site here
  url: process.env.URL || 'https://huteming.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false, // 自定义 URL/链接后是否添加末尾斜杠

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'huteming', // 拥有部署仓库的 GitHub 用户或组织
  projectName: 'huteming.github.io', // 部署仓库的名字
  deploymentBranch: 'gh-pages', // 静态文件部署到的分支名称

  onBrokenLinks: 'throw', // 检测到无效链接时的行为
  onBrokenMarkdownLinks: 'warn', // 在检测到无效 Markdown 链接时的行为

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans', // en, zh-Hans
    locales: ['zh-Hans'], // en, zh-Hans
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/overwrite-default.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: TITLE,
      logo: {
        alt: TITLE,
        src: 'site/logo/logo.png',
      },
      items: [
        {
          type: 'docSidebar', // 把这个项目的类型设置为侧边栏链接
          position: 'left',
          label: 'Docs',
          sidebarId: 'docsSidebar', // 可以将一个导航栏项目链接到某个给定侧边栏的第一个文档链接
        },
        {
          type: 'docSidebar',
          position: 'left',
          label: 'Roadmap',
          sidebarId: 'roadmap',
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },

    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },

    // https://github.com/gabrielcsapo/docusaurus-plugin-image-zoom
    zoom: {
      selector: '.markdown img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      },
    },

    // Algolia DocSearch: https://www.algolia.com/apps/VVTGI6SZFO/dashboard
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
  } satisfies Preset.ThemeConfig,

  scripts: [
    // 图标库: https://fontawesome.com/search
    {
      src: 'https://kit.fontawesome.com/3e34564138.js',
      async: true,
    },
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  plugins: [
    'docusaurus-plugin-image-zoom',
    'docusaurus-plugin-sass',
    [
      './src/plugins/blog-data/index.ts',
      {
        blogSidebarCount: 5,
        processBlogPosts: async ({ blogPosts }) => {
          return blogPosts.sort((a, b) => {
            return dayjs(a.metadata.date).isAfter(dayjs(b.metadata.date)) ? -1 : 1
          })
        },
      } satisfies Preset.Options['blog'],
    ],
  ],
}

export default config
