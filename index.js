const Koa = require('koa')

const app = new Koa()

const { RestGen, route, noauth } = require('./src/restgen')
const auth = require('./src/auth')
const model = require('./src/model')

module.exports = { app, RestGen, route, noauth, auth, model }
