const path = require('path')
const rootPath = path.resolve(process.cwd())
const buildPath = path.join(rootPath, 'build')

module.exports = {
  rootPath,
  buildPath,
  appPath: path.join(rootPath, 'app'),
  serverSrcPath: path.join(rootPath, 'src'),
  serverBuildPath: buildPath,
  userNodeModulesPath: path.join(rootPath, 'node_modules'),
}