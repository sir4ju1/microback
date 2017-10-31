require('dotenv').config()
const router = require('koa-router')()

function ws(path) {
  if (typeof path !== 'string') {
    throw new Error('The first argument must be an Websocket path')
  }
  return function (target, name) {
    if (!target['routes']) {
      target['routes'] = {}
    }
    target['routes'][name] = {
      path
    }
  }
}
class WsGen {
  constructor (path) {
    this.ws = {}
    this.path = path || this.constructor.name
    global[this.path] = {}
  }
  /**
   * Send 
   */
  send (endpoint, message) {
    this.ws.server.clients.forEach(c => {
      if (c.upgradeReq.url === `/${endpoint}`) {
        c.send(message)
      }
    })
  }
  /**
   * Generate Route for Class
   */
  generate (app) {
    var self = this
    
    for (var func in this.routes) {
      if (this.routes.hasOwnProperty(func)) {
        const route = this.routes[func]
        router.get(`/${route.path}`, this[func].bind(this))
      }
    }
    const routes = router.routes()
    this.ws = app.ws.use(routes).use(router.allowedMethods())
    global[this.path].send = this.send.bind(this)
    return routes
  }
}

module.exports = {
  WsGen,
  ws
}
