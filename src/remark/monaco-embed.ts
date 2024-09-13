import { visit, SKIP } from 'unist-util-visit'
import { h } from 'hastscript'

export default function monacoEmbedPlugin() {
  return (tree, file) => {
    visit(tree, 'code', (node: any) => {
      if (node.meta !== 'monaco') {
        return
      }

      const data: any = node.data || (node.data = {})
      const attributes = node.attributes || {}

      const tagName = 'Monaco'
      const code = node.value

      data.hName = tagName
      data.hProperties = {
        ...h(tagName, attributes).properties,
        code,
      }

      return SKIP
    })
  }
}
