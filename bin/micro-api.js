#!/usr/bin/env node

var program = require('commander')
const Koa = require('koa')
const glob = require('glob')
global.appRoot = process.env.PWD

program
  .version('0.0.1')
  .option('-h, --host [host]', 'Host to run server')
  .option('-p, --port [port]', 'Port to run server')
  .parse(process.argv)

var host = !!program.host ? program.host : '0.0.0.0',
  port = !!program.port ? program.port : 8080

const app = new Koa()
glob("app/api/*.js", null, function (er, files) {
  files.forEach(f => {
    var Cls = require(`${appRoot}/${f}`).default
    var cls = new Cls()
    app.use(cls.generate())
  })
  app.listen(port, () => console.log(`Server Started @ ${port}`))
})

process.on('SIGINT', process.exit)

