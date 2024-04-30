/**
 * 参考自: https://unifiedjs.com/explore/package/remark-directive/
 */
import { visit } from 'unist-util-visit'

export default function codepenEmbedPlugin() {
  return (tree, file) => {
    visit(tree, (node: any) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        if (node.name !== 'codepen') return

        const data: any = node.data || (node.data = {})
        const attributes = node.attributes || {}

        const { id, editable = true, title } = attributes
        const defaultTab = attributes['default-tab'] || 'result'
        const themeId = attributes['theme-id'] || 'light'

        if (node.type === 'textDirective') {
          file.fail(
            'Unexpected `:codepen` text directive, use two colons for a leaf directive',
            node,
          )
        }

        if (!id) {
          file.fail('Unexpected missing `id` on `codepen` directive', node)
        }

        data.hName = 'iframe'
        data.hProperties = {
          src: `https://codepen.io/huteming/embed/${id}?default-tab=${defaultTab}&editable=${editable}&theme-id=${themeId}`,
          width: '100%',
          height: 300,
          scrolling: 'no',
          title,
          frameborder: 'no',
          loading: 'lazy',
          allowtransparency: 'true',
          allowfullscreen: 'true',
        }
      }
    })
  }
}
