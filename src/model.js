const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB, {
  useMongoClient: true
})
mongoose.Promise = Promise

module.exports = function (model) {
  const schema = mongoose.Schema(model.schema)
  var mo = mongoose.model(model.name, schema)
  mo.ensureIndexes()
  return mo
}
