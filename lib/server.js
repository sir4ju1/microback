const Koa = require('koa')
const path = require('path')
const chalk = require('chalk')
const dotenv = require('dotenv')
const cors = require('kcors')
const Router = require('koa-router')
const config = require('../config/paths')
const app = new Koa()
const router = new Router()
dotenv.config()

const port = process.env.PORT || 2000
const host = process.env.HOST || '0.0.0.0'

const normalizedPath = path.join(config.rootPath, 'app/api')
var routes = []
var routeList = {}
var checkRoutes = new Set()
require('fs')
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    var Cls = require(`../../../app/api/${file}`).default
    var cls = new Cls()
    const route = cls.generate()
    route.router.stack.forEach(s => {
      if (!routeList[Cls.name]) {
        routeList[Cls.name] = {}
      }
      let name = s.stack[s.stack.length - 1].name.replace('bound ', '')
      const method = s.methods[s.methods.length - 1]
      const routeDef = `${method}-${s.path}`
      if (!checkRoutes.has(routeDef))
        routeList[Cls.name][name] = { method, path: s.path }
      checkRoutes.add(routeDef)
    })

    routes.push(route)
  })
app.use(cors())
router.get('/routes', async (ctx) => {
  ctx.body = routeList
})

app.use(router.routes())

routes.forEach(r => app.use(r))

if (!module.parent) {
  app.listen(port, () => console.log(chalk.bgGreen('  OK  '), chalk.green(`Server started`), chalk.dim(`[http://localhost:${port}]`)))
}

module.exports = app
