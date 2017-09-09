const Koa = require('koa')
const colors = require('colors')
const app = new Koa()
var r = require.context('../../../app/api', true, /\.js$/)

r.keys().forEach(f => {
  var Cls = r(f).default
  var cls = new Cls()
  app.use(cls.generate())
})


app.listen(2000, () => console.log('OK'.bgGreen, `Server Started: http://localhost:2000`.underline.green))

module.exports = app
