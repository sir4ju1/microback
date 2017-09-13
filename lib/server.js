const Koa = require('koa')
const path = require('path')
const chalk = require('chalk')
const dotenv = require('dotenv')
const cors = require('kcors')
const jwt = require('koa-jwt')
const config = require('../config/paths')
const app = new Koa()


dotenv.config()
const port = process.env.PORT || 2000
const host = process.env.HOST || '0.0.0.0'

const normalizedPath = path.join(config.rootPath, 'app/api')
var noAuthList = []
var routes = []

var r = require.context('../../../app/api')

r.key().forEach(function (file) {
  var Cls = r(file).default
  var cls = new Cls()
  const route = cls.generate()
  routes.push(route.routes)
  noAuthList.push(...route.noAuth)
})

app.use(cors())
if (process.env.AUTH) {
  app.use(jwt({
    secret: process.env.SECUREKEY || 'my-key'
  }).unless({
    path: noAuthList
  }))
}
routes.forEach(r => app.use(r))

if (!module.parent) {
  app.listen(port, () => console.log(chalk.bgGreen('  OK  '), chalk.green(`Server started`), chalk.dim(`[http://localhost:${port}]`)))
}

module.exports = app
