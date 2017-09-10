const Koa = require('koa')

const app = new Koa()

const { RestGen, route } = require('./src/restgen')

module.exports = { app, RestGen, route }
