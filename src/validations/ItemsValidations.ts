import * as express from 'express'
import * as Joi from '@hapi/joi'

export default class ItemsValidation {
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

  public async show (request: express.Request, response: express.Response, next : express.NextFunction) {
    const schema: Joi.ObjectSchema = Joi.object({
      item_id: Joi.number().greater(0)
    })

    try {
      await schema.validateAsync(request.params)
      next()
    } catch (err) {
      response.status(400).json(err)
    }
  }

  public async store (request: express.Request, response: express.Response, next : express.NextFunction) {
    const schema: Joi.ObjectSchema = Joi.object({
      name: Joi.string()
        .required(),
      groups: Joi.array().items(Joi.number().required())
    })

    try {
      await schema.validateAsync(request.body)
      next()
    } catch (err) {
      response.status(400).json(err)
    }
  }

  public async update (request: express.Request, response: express.Response, next : express.NextFunction) {
    const schema: Joi.ObjectSchema = Joi.object({
      name: Joi.string()
        .required(),
      groups: Joi.array().items(Joi.number().required())
    })

    try {
      await schema.validateAsync(request.body)
      next()
    } catch (err) {
      response.status(400).json(err)
    }
  }

  public async destroyOne (request: express.Request, response: express.Response, next : express.NextFunction) {
    const schema: Joi.ObjectSchema = Joi.object({
      item_id: Joi.string()
        .required()
    })

    try {
      await schema.validateAsync(request.params)
      next()
    } catch (err) {
      response.status(400).json(err)
    }
  }

  public async destroyMany (request: express.Request, response: express.Response, next : express.NextFunction) {
    const schema: Joi.ObjectSchema = Joi.object({
      items: Joi.array()
        .items(Joi.number().required())
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
