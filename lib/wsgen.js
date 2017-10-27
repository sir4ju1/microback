require('dotenv').config()
const router = require('koa-router')()

function ws (path) {
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
  constructor() {
    this.ws = {}
  }
  send (message) {
    this.ws.server.clients.forEach(c => {
      c.send(message)
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
    return routes
  }
}

module.exports = {
  WsGen,
  ws
}
