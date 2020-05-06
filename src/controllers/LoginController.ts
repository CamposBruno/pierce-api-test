import * as express from 'express'

import Users from '../models/users'
import { comparePassword } from '../services/hashPassword'
import * as jsonWebToken from '../services/jsonWebToken'

export default class LoginController {
  public async store (request: express.Request, response: express.Response) {
    const { email, password } = request.body

    try {
      const user = await Users.findOne({ where: { email } })

      if (!user) {
        return response.status(200).json({ success: false, message: 'Invalid email or password' })
      }

      const isValidPassword = await comparePassword(password, user.password_hash)

      if (!isValidPassword) {
        return response.status(200).json({ success: false, message: 'Invalid email or password' })
      }

      return response.status(200).json({
        success: true,
        token: await jsonWebToken.sign(user)
      })
    } catch (error) {
      response.status(500).json(error)
    }
  }
}
