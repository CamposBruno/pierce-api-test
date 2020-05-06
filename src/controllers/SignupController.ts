import * as express from 'express'

import Users from '../models/users'

export default class SignupController {
  public async store (request: express.Request, response: express.Response) {
    const { email, password } = request.body

    const user = await Users.create({ email, password_hash: password })

    response.status(200).json(user)
  }
}
