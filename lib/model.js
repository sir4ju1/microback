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
  const schema = new mongoose.Schema(model.schema)
  if (model.paginate) {
    schema.plugin(paginate)
  }
  const mo = mongoose.model(model.name, schema)
  mo.ensureIndexes()
  return mo
}
