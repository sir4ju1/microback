const path = require('path')
const chalk = require('chalk')
const dotenv = require('dotenv')
const config = require('../config/paths')
const app = require('../').app

dotenv.config()
const port = process.env.PORT || 2000
const host = process.env.HOST || '0.0.0.0'

const normalizedPath = path.join(config.rootPath, 'app/api')
require('fs').readdirSync(normalizedPath).forEach(function (file) {
  var Cls = require(`../../../app/api/${file}`).default
  var cls = new Cls()
  app.use(cls.generate())
})

app.listen(port, () => console.log(chalk.bgGreen('  OK  '), chalk.green(`Server started`), chalk.bold.dim(`[http://localhost:${port}]`)))
