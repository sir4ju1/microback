require('dotenv').config()
const router = require('koa-router')({
  prefix: '/api'
})
const jwt = require('koa-jwt')({
  secret: process.env.SECUREKEY || 'my-key'
})
const pluralize = require('pluralize')
const body = require('koa-body')({ multipart: true })

function destruct (args) {
  const hasPath = typeof args[0] === 'string'
  const path = hasPath ? args[0] : ''
  const middleware = hasPath ? args.slice(1) : args

  if (middleware.some(m => typeof m !== 'function')) {
    throw new Error('Middleware must be function')
  }

  return [path, middleware]
}

// @route(method, path: optional, ...middleware: optional)
function route (method, ...args) {
  if (typeof method !== 'string') {
    throw new Error('The first argument must be an HTTP method')
  }

  const [path] = destruct(args)

  return function (target, name) {
    if (!target['routes']) {
      target['routes'] = {}
    }
    target['routes'][name] = { method, path }
  }
}
function noauth () {
  return function (target, name) {
    if (!target['noauths']) {
      target['noauths'] = {}
    }
    target['noauths'][name] = true
  }
}
class RestGen {
  constructor(path, model) {
    this.methods = {
      find: 'get',
      findOne: 'get',
      create: 'post',
      update: 'put',
      remove: 'delete',
      patch: 'patch'
    }
    this.pluralizedPath = pluralize(path)
    this.path = path
    this.model = model
    this.noAuth = []
  }
  async find (ctx) {
    try {
      const models = await this.model.find().exec()
      ctx.body = { success: true, data: models }
    } catch (error) {
      ctx.body = { success: false, error }
    }
  }
  async findOne (ctx) {
    try {
      const id = ctx.params.id
      const model = await this.model.findById(id).exec()
      ctx.body = { success: true, data: model }
    } catch (error) {
      ctx.body = { success: false, error }
    }
  }
  async create (ctx) {
    try {
      const body = ctx.request.body
      const model = await this.model.create(body)
      ctx.body = { success: true, data: model }
    } catch (error) {
      ctx.body = { success: false, error }
    }
  }
  async update (ctx) {
    try {
      const body = ctx.request.body
      const result = await this.model.update({ _id: body.id }, body)
      ctx.body = { success: true, data: result }
    } catch (error) {
      ctx.body = { success: false, error }
    }
  }
  async remove (ctx) {
    try {
      const id = ctx.params.id
      const result = await this.model.deleteOne({ _id: id })
      ctx.body = { success: true, data: result }
    } catch (error) {
      ctx.body = { success: false, error }
    }
  }
  createRoute (method, path, fun, middleware) {
    if (!process.env.AUTH || (this.noauths && this.noauths[fun])) {
      if (!middleware) {
        router[method](path, this[fun].bind(this))
      } else {
        router[method](path, middleware, this[fun].bind(this))
      }
    } else {
      if (!middleware) {
        router[method](path, jwt, this[fun].bind(this))
      } else {
        router[method](path, jwt, middleware, this[fun].bind(this))
      }
    }
  }
  /**
   * Generate Route for Class
   */
  generate () {
    var self = this
    if (this.model) {
      this.createRoute('get', `/${this.pluralizedPath}`, 'find')
      this.createRoute('get', `/${this.path}/:id`, 'findOne')
      this.createRoute('post', `/${this.pluralizedPath}`, 'create', body)
      this.createRoute('put', `/${this.pluralizedPath}`, 'update', body)
      this.createRoute('delete', `/${this.path}/:id`, 'remove')
    }
    let list = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(f => {
      if (typeof (self[f]) === 'function') {
        return f
      }
    }).map(f => f)
    list.forEach((fun) => {
      let routeExp = ''
      switch (fun) {
        case 'constructor':
        case 'route':
        case 'find':
        case 'findOne':
        case 'create':
        case 'update':
        case 'remove':
          break
        default:
          let route = this.routes && this.routes[fun] ? this.routes[fun] : {
            method: fun.includes('create') ? 'post' : fun.includes('update') ? 'put' : 'get',
            path: fun
          }
          switch (route.method) {
            case 'post':
            case 'put':
            case 'patch':
              route.path = `/${this.pluralizedPath}/${route.path}`
              this.createRoute(route.method, `${route.path}`, fun, body)
              break
            case 'get':
            case 'delete':
              route.path = `/${this.pluralizedPath}/${route.path}`
              this.createRoute(route.method, `${route.path}`, fun)
              break
          }
          break
      }
    })
    const routes = router.routes()
    return routes
  }
}

module.exports = { route, noauth, RestGen }
