import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      label: '网络',
      type: 'category',
      items: [{ type: 'autogenerated', dirName: 'internet' }],
    },
    {
      label: 'HTML',
      type: 'category',
      items: [{ type: 'autogenerated', dirName: 'html' }],
    },
    {
      label: 'CSS',
      type: 'category',
      items: [{ type: 'autogenerated', dirName: 'css' }],
    },
    {
      label: 'JS',
      type: 'category',
      items: [{ type: 'autogenerated', dirName: 'js' }],
    },
  ],
}

export default sidebars
