import * as express from 'express'
import sequelize from 'sequelize'

import Items from '../models/items'
import ItemsGroups from '../models/itemsGroups'
import Groups from '../models/groups'

export default class ItemsController {
  public async index (request: any, response: express.Response) {
    try {
      const { page } = request.query

      const limit = 4
      const offset = Number(page || 1) * limit - limit

      const items = await Items.findAll({ where: { user_id: request.user.id }, limit, offset })
      const totalItems = await Items.count({ where: { user_id: request.user.id } })

      return response.status(200).json({
        success: true,
        items,
        totalItems,
        page
      })
    } catch (error) {
      response.status(500).json({ success: false, message: error.message })
    }
  }

  public async show (request: any, response: express.Response) {
    const { item_id } = request.params

    try {
      const item = await Items.findOne({ where: { user_id: request.user.id, id: item_id } })
      const groups = await ItemsGroups.findAll({
        include: [{ model: Groups }], where: { item_id }
      })

      return response.status(200).json({
        success: true,
        item,
        groups
      })
    } catch (error) {
      response.status(500).json({ success: false, message: error.message })
    }
  }

  public async store (request: any, response: express.Response) {
    const { name, groups } = request.body
    const user_id = request.user.id

    try {
      const item = await Items.create({ name, user_id })

      if (Number(groups) > 0) {
        groups.forEach(async (group_id : Number) => {
          await ItemsGroups.create({ item_id: item.id, group_id })
        })
      }

      return response.status(200).json({
        success: true,
        item
      })
    } catch (error) {
      console.log(error)
      response.status(500).json({ success: false, message: error.message })
    }
  }

  public async update (request: any, response: express.Response) {
    const { name, groups } = request.body
    const { item_id } = request.params
    const user_id = request.user.id

    try {
      const item = await Items.update({ name }, { where: { id: item_id, user_id } })

      await ItemsGroups.destroy({ where: { id: item_id } })

      if (Number(groups) > 0) {
        groups.forEach(async (group_id : Number) => {
          await ItemsGroups.create({ item_id, group_id })
        })
      }

      return response.status(200).json({
        success: true,
        item
      })
    } catch (error) {
      response.status(500).json({ success: false, message: error.message })
    }
  }

  public async destroyOne (request: any, response: express.Response) {
    const { item_id } = request.params
    const user_id = request.user.id

    console.log(item_id)

    try {
      await Items.destroy({ where: { id: item_id, user_id } })

      return response.status(200).json({
        success: true
      })
    } catch (error) {
      response.status(500).json({ success: false, message: error.message })
    }
  }

  public async destroyMany (request: any, response: express.Response) {
    const { items } = request.body
    const user_id = request.user.id

    try {
      await Items.destroy({ where: { id: { [sequelize.Op.in]: items }, user_id } })

      return response.status(200).json({
        success: true
      })
    } catch (error) {
      response.status(500).json({ success: false, message: error.message })
    }
  }
}
