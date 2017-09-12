const crypto = requier('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateHash (password) {
  const secret = processs.env.PASS || 'abcdgef'
  passwordHash = crypto.createHmac('sha256', secret)
    .update(this.password)
    .digest('hex')
  return passwordHash
}
async function login (emai, password, model) {
  try {
    const secret = process.env.PASS || 'abcdgef'
    body.password = crypto.createHmac('sha256', secret)
      .update(body.password)
      .digest('hex')
    const user = await model.findOne({ email: email, password: password }).exec()
    const token = jwt.sign({ id: user._id }, process.env.SECUREKEY || 'my-key')
    return token
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { login, generateHash }
