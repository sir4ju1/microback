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
  /**
   * Generate Route for Class
   */
  generate () {
    var self = this

    let list = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(f => {
      if (typeof (self[f]) === 'function') {
        return f
      }
    }).map(f => f)
    list.forEach((fun) => {
      let routeExp = ''
      let route = this.routes && this.routes[fun] ? this.routes[fun] : {
        path: fun
      }
      router.get(`/${route.path}`, this[fun].bind(this))
    })
    const routes = router.routes()
    return routes
  }
}

module.exports = {
  WsGen,
  ws
}
