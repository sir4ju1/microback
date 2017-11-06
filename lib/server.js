const fs = require('fs'),
Koa = require('koa'),
path = require('path'),
chalk = require('chalk'),
dotenv = require('dotenv'),
cors = require('kcors'),
Router = require('koa-router'),
WebSocket = require('koa-websocket'),
config = require('../config/paths'),
app = new Koa(),
router = new Router()
dotenv.config()

const port = process.env.PORT || 2000
const host = process.env.HOST || '0.0.0.0'

const normalizedPath = path.join(config.rootPath, 'app/api'),
wsPath = path.join(config.rootPath, 'app/ws')

var routes = [],
wsr = [],
routeList = { REST: {}, WS: {} },
checkRoutes = new Set()

app.use(cors())

function addRoute(Cls, type, app) {
  var cls = new Cls()
  const route = cls.generate(app)
  route.router.stack.forEach(s => {
    if (!routeList[type][Cls.name]) {
      routeList[type][Cls.name] = {}
    }
    let name = s.stack[s.stack.length - 1].name.replace('bound ', '')
    const method = s.methods[s.methods.length - 1]
    const routeDef = `${type}-${method}-${s.path}`
    if (!checkRoutes.has(routeDef)) {
      routeList[type][Cls.name][name] = type === 'REST' ? { method, path: s.path } : { path: s.path }
    }
    checkRoutes.add(routeDef)
  })
}
/**
 * Adding REST Endpoints
 */
fs
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    const Cls = require(`../../../app/api/${file}`).default
    addRoute(Cls, 'REST', app)
  })
/**
 * Adding Websocket Endpoints
 */
if (fs.existsSync(wsPath)) {
  WebSocket(app)
  fs
  .readdirSync(wsPath)
  .forEach(function (file) {
    const Cls = require(`../../../app/ws/${file}`).default
    addRoute(Cls, 'WS', app)
  })
}


/**
 * Get router information
 */
if (process.env.NODE_ENV === 'development') {
  router.get('api/routes', async (ctx) => {
    ctx.body = routeList
  })
  app.use(router.routes())
}


if (!module.parent) {
  app.listen(port, () => console.log(chalk.bgGreen('  OK  '), chalk.green(`Server started`), chalk.dim(`[http://localhost:${port}]`)))
}

module.exports = app
