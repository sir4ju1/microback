import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';


export default class Auth {
  static generateHash (password: string) {
    const secret = process.env.PASS || 'abcdgef'
    const passwordHash = crypto.createHmac('sha256', secret)
      .update(password)
      .digest('hex')
    return passwordHash
  }
  static generateToken(data: any) {
    try {
      const token = jwt.sign(data, process.env.SECUREKEY || 'my-key')
      return token
    } catch (error) {
      throw new Error(error)
    }
  }
}

