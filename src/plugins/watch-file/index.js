const path = require('path');

module.exports = function (context, options) {
  const resolve = (filePath) => {
    return path.resolve(context.siteDir, filePath)
  }

  return {
    name: 'docusaurus-plugin-watch-file',

    getPathsToWatch() {
      return [resolve('directories.json')];
    },
  };
};