import * as express from 'express'
import * as Joi from '@hapi/joi'

export default class GroupsValidation {
  public async index (request: express.Request, response: express.Response, next : express.NextFunction) {
    const schema: Joi.ObjectSchema = Joi.object({
      page: Joi.number().greater(0)
    })

    try {
      await schema.validateAsync(request.query)
      next()
    } catch (err) {
      response.status(400).json(err)
    }
  }
}
