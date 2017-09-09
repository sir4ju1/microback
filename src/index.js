const Koa = require('koa')
const config = require('../config/paths')

const app = new Koa()
// let routes = []
const normalizedPath = require('path').join(config.rootPath, 'app/api')
require('fs').readdirSync(normalizedPath).forEach(function (file) {
  var Cls = require(`../../../${file}`).default
  var cls = new Cls()
  app.use(cls.generate())
})

// const app = (app) => {
//   routes.forEach(route => {
//     app.use(route)
//   })
// }
app.listen(2000)
module.exports = app
