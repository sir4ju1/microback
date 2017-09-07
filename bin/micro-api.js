#!/usr/bin/env node

var program = require('commander')
const Koa = require('koa')
const glob = require('glob')
var babel = require('babel-core')
var fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')

global.appRoot = process.env.PWD

program
  .version('0.0.1')
  .option('-h, --host [host]', 'Host to run server')
  .option('-p, --port [port]', 'Port to run server')
  .parse(process.argv)

var host = !!program.host ? program.host : '0.0.0.0',
  port = !!program.port ? program.port : 8080

const app = new Koa()

function mkdir(dir) {
  try {
    fs.mkdirSync(dir)
  } catch (e) {
    if (e.errno === 34) {
      mkdir(path.dirname(dir))
      mkdir(dir)
    }
  }
}
rimraf.sync(appRoot + '/build')
var files = glob.sync("app/**/*.js")
files.forEach(f => {
  var {
    code
  } = babel.transformFileSync(f, {
    plugins: [
      "transform-es2015-modules-commonjs", [
        "module-resolver",
        {
          "root": [
            "./app"
          ],
          "alias": {
            "helper": "./app/helpers",
            "model": "./app/models"
          }
        }
      ]
    ]
  })
  var filepath = path.dirname(appRoot + '/build/' + f)
  // fs.mkdirSync(filepath)
  console.log(filepath)
  mkdirp.sync(filepath)

  fs.writeFileSync(appRoot + '/build/' + f, code)
})
var apis = glob.sync(appRoot + '/build/app/api/*.js')
apis.forEach(f => {
  var Cls = require(f).default
  var cls = new Cls()
  app.use(cls.generate())
})
app.listen(port, () => console.log(`Server Started @ ${port}`))

process.on('SIGINT', process.exit)