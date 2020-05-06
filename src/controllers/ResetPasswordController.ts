import * as express from 'express'

import Users from '../models/users'

export default class ResetPasswordController {
  public async reset (request: express.Request, response: express.Response) {
    const { email } = request.body

    try {
      const user = await Users.findOne({ where: { email } })

      if (!user) {
        return response.status(200).json({ success: false, message: 'Invalid email or password' })
      }

      // TODO : send email with change password link

      return response.status(200).json({ success: true, message: 'Password reset requested' })
    } catch (error) {
      response.status(500).json(error)
    }
  }
}
