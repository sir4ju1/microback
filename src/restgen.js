const router = require('koa-router')({
  prefix: '/api'
})
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
function noauth (target, name) {
  if (!target['noauths']) {
    target['noauths'] = {}
  }
  target['noauths'][name] = true
}
class RestGen {
  constructor (path, model) {
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
      const id = ctx.params.id
      const body = ctx.request.body
      const result = await this.model.update({ _id: id }, body)
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

  /**
   * Generate Route for Class
   */
  generate () {
    var self = this
    router.get(`/${this.path}`, this.find.bind(this))
    router.get(`/${this.path}/:id`, this.findOne.bind(this))
    router.post(`/${this.path}`, body, this.create.bind(this))
    router.put(`/${this.path}/:id`, body, this.update.bind(this))
    router.delete(`/${this.path}/:id`, this.remove.bind(this))
    let list = Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(f => {
      if (typeof (self[f]) === 'function') {
        return f
      }
    }).map(f => f)
    list.forEach((fun) => {
      switch (fun) {
        case 'constructor':
        case 'route':
          break
        default:
          let route = this.routes && this.routes[fun] ? this.routes[fun] : {
            method: fun.includes('post') ? 'post' : fun.includes('put') ? 'put' : 'get',
            path: fun
          }
          route.path = `/${this.path}/${route.path}`
          if (this.noauths && this.noauths[fun]) {
            this.noAuth.push(`/api${routes.path }`)
          }
          switch (route.method) {
            case 'post':
            case 'put':
            case 'patch':
            case 'delete':
              router[route.method](`${route.path}`, body, this[fun].bind(this))
              break
            default:
              router.get(`${route.path}`, this[fun].bind(this))
              break
          }
          break
      }
    })
    return router.routes()
  }
  getNoAuths () {
    return this.noAuth
  }
}

module.exports = { route, noauth, RestGen }
