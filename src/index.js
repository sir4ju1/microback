const Koa = require('koa')
const path = require('path')
const chalk = require('chalk')
const config = require('../config/paths')

const app = new Koa()
const normalizedPath = path.join(config.rootPath, 'app/api')
require('fs').readdirSync(normalizedPath).forEach(function (file) {
  var Cls = require(`../../../app/api/${file}`).default
  var cls = new Cls()
  app.use(cls.generate())
})


app.listen(2000, () => console.log(chalk`{bgGreen OK} Server started: http:localhost:2000`))
module.exports = app
