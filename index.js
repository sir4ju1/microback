const Koa = require('koa')

const app = new Koa()

const { RestGen, route } = require('./src/restgen')
const auth = require('./src/auth')

module.exports = { app, RestGen, route, auth }
