const mongoose = require('mongoose')
const paginate = require('mongoose-paginate')
require('dotenv').config()

mongoose.connect(process.env.MONGODB, {
  useMongoClient: true
})
mongoose.Promise = Promise

module.exports = function (model) {
  const log = {
    type: Date,
    default: Date.now
  }
  model.schema.created = log
  model.schema.updated = log
  const schema = mongoose.Schema(model.schema)
  const mo = mongoose.model(model.name, schema)
  if (model.paginate) {
    mo.plugin(paginate)
  }
  mo.ensureIndexes()
  return mo
}
