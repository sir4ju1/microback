const path = require('path')
const chalk = require('chalk')
const dotenv = require('dotenv')
const cors = require('kcors')
const jwt = require('koa-jwt')
const config = require('../config/paths')
const app = require('../').app

dotenv.config()
const port = process.env.PORT || 2000
const host = process.env.HOST || '0.0.0.0'

const normalizedPath = path.join(config.rootPath, 'app/api')
var noAuthList = []
require('fs').readdirSync(normalizedPath).forEach(function (file) {
  var Cls = require(`../../../app/api/${file}`).default
  var cls = new Cls()
  app.use(cls.generate())
  noAuthList.concat(cls.getNoAuths())
})
app.use(cors())
if (process.env.AUTH) {
  app.use(jwt({
    secret: process.env.SECUREKEY || 'my-key'
  }).unless({
    path: noAuthList
  }))
}

app.listen(port, () => console.log(chalk.bgGreen('  OK  '), chalk.green(`Server started`), chalk.dim(`[http://localhost:${port}]`)))
