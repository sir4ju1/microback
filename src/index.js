const Koa = require('koa')
// const glob = require('glob')

const app = new Koa()
var appRoot = require('path').resolve(process.cwd())
// let routes = []
const normalizedPath = require('path').join(appRoot, 'app/api')
require('fs').readdirSync(normalizedPath).forEach(function (file) {
  var Cls = require(`/${normalizedPath}/${file}`).default
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
