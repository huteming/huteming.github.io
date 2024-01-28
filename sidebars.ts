import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      label: 'JS',
      type: 'category',
      items: [{ type: 'autogenerated', dirName: 'js' }],
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
      label: 'HTTP',
      type: 'category',
      items: [{ type: 'autogenerated', dirName: 'http' }],
    },
  ],
}

export default sidebars