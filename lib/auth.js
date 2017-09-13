const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateHash (password) {
  const secret = processs.env.PASS || 'abcdgef'
  passwordHash = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex')
  return passwordHash
}
async function login (emai, password, model) {
  try {
    password = generateHash(password)
    const user = await model.findOne({ email: email, password: password }).exec()
    const token = jwt.sign({ id: user._id }, process.env.SECUREKEY || 'my-key')
    return token
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { login, generateHash }
