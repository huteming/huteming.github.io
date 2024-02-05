import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const TITLE = '特_明'

const config: Config = {
  title: TITLE,
  tagline: '一点点记录', // 网站标语
  favicon: 'img/site/logo/favicon.ico',

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

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
        alt: 'Logo',
        src: 'site/logo/logo.png',
      },
      items: [
        {
          label: 'Docs',
          sidebarId: 'docsSidebar',
          type: 'docSidebar',
          position: 'left',
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
    'docusaurus-plugin-sass',
    [
      './src/plugins/blog-data/index.ts',
      {
        blogSidebarCount: 5,
      } satisfies Preset.Options['blog'],
    ],
  ],
}

export default config
