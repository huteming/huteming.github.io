// ./en/index.json
// ./en/a/index.json
// ./en/a/b.json
export default function addModuleByPath(
  module: Record<string, any>,
  path: string,
  data: any,
): Record<string, any> {
  const paths = path.split('/')
  const keys = paths.slice(1, paths.length - 1)

  const submodule = keys.reduce((parent, key) => {
    if (!parent[key]) {
      parent[key] = {}
    }
    return parent[key]
  }, module)

  const key = paths[paths.length - 1].replace(/^(.*)\.\w+$/, '$1')
  Object.assign(submodule, key === 'index' ? data : { [key]: data })

  return module
}
