import * as express from 'express'
import * as Joi from '@hapi/joi'

export default class SignupValidation {
  public async store (request: express.Request, response: express.Response, next : express.NextFunction) {
    const schema: Joi.ObjectSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .required()
    })

    try {
      await schema.validateAsync(request.body)
      next()
    } catch (err) {
      response.status(400).json(err)
    }
  }
}
