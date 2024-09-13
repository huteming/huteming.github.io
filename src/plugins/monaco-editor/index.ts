import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

export default function (context, options) {
  return {
    name: 'monaco-editor',
    configureWebpack(config, isServer) {
      return {
        plugins: [
          new MonacoWebpackPlugin({
            languages: ['javascript', 'typescript', 'json'],
          }),
        ],
      }
    },
  }
}
