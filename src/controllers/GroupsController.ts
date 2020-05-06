import * as express from 'express'

import Groups from '../models/groups'

export default class GroupsController {
  public async index (request: express.Request, response: express.Response) {
    try {
      const { page } = request.query

      const limit = 4
      const offset = Number(page || 1) * limit - limit

      const groups = await Groups.findAll({ where: {}, limit, offset })
      const totalGroups = await Groups.count({ where: {} })

      return response.status(200).json({
        success: true,
        groups,
        totalGroups,
        page
      })
    } catch (error) {
      response.status(500).json({ success: false, message: error.message })
    }
  }
}
