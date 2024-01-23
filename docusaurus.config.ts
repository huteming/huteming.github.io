import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const TITLE = '特_明'

const config: Config = {
  title: TITLE,
  tagline: '一点点积累', // 网站标语
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: process.env.URL || 'https://huteming.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'huteming', // Usually your GitHub org/user name.
  projectName: 'huteming.github.io', // Usually your repo name.

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
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: TITLE,
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  scripts: [
    // 图标库: https://fontawesome.com/search
    {
      src: 'https://kit.fontawesome.com/3e34564138.js',
      async: true,
    },
  ],

  plugins: [
    [
      './src/plugins/blog-data/index.ts',
      {
        blogSidebarCount: 5,
      } satisfies Preset.Options['blog'],
    ],
  ],
}

export default config
