const { RestGen, route, noauth } = require('./lib/restgen')
const { WsGen, ws } = require('./lib/restgen')
const auth = require('./lib/auth')
const model = require('./lib/model')
const server = function () {
  return require('./lib/server').listen()
}

module.exports = { server, RestGen, WsGen, route, ws, noauth, auth, model }
