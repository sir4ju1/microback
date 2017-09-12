const { RestGen, route, noauth } = require('./lib/restgen')
const auth = require('./lib/auth')
const model = require('./lib/model')
const app = require('./lib/server')

module.exports = { app, RestGen, route, noauth, auth, model }
