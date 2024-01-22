/**
 * 参考自: https://zhuanlan.zhihu.com/p/569003307
 */
import defaultBlogPlugin from '@docusaurus/plugin-content-blog'
import type { PluginOptions, BlogContent } from '@docusaurus/plugin-content-blog'
import type { LoadContext, Plugin } from '@docusaurus/types'

export default async function blogPluginRouteHome(context: LoadContext, options: PluginOptions): Promise<Plugin<BlogContent>> {
  const blogPluginInstance = await defaultBlogPlugin(context, options)

  return {
    ...blogPluginInstance,

    async contentLoaded(...args) {
      const originalResponse = await blogPluginInstance.contentLoaded(...args)

      const { content, actions } = args[0]
      const { blogPosts, blogTags } = content
      const { setGlobalData } = actions

      setGlobalData({
        blogs: blogPosts,
        tags: blogTags,
      })
      return originalResponse
    },
  }
}

export * from '@docusaurus/plugin-content-blog'
