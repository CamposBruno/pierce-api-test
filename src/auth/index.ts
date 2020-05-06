import * as express from 'express'

import * as jsonWebToken from '../services/jsonWebToken'

export default class Auth {
  public async authenticate (request: any, response: express.Response, next: express.NextFunction) {
    try {
      if (request.headers.authorization === undefined) throw new Error('Token is required')

      const token = request.headers.authorization.replace(/Bearer/g, '').trim()

      const decodedToken = await jsonWebToken.verify(token)

      if (decodedToken) {
        request.user = decodedToken.data
        return next()
      } else {
        response.status(200).json({ success: false, message: 'Token is not valid' })
      }
    } catch (error) {
      response.status(500).json({ success: false, message: error.message })
    }
  }
}
