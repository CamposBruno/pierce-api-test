import { Sequelize, Model, DataTypes } from 'sequelize'
import SequelizeOptions from '../config/database'

import Groups from './groups'
import Items from './items'

export default class ItemsGroups extends Model {
    public id! : Number
    public group_id! : Number
    public item_id! : Number
}

ItemsGroups.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  item_id: DataTypes.INTEGER,
  group_id: DataTypes.INTEGER
}, {
  sequelize: new Sequelize(SequelizeOptions)

})

ItemsGroups.belongsTo(Items, { foreignKey: 'item_id' })
ItemsGroups.belongsTo(Groups, { foreignKey: 'group_id' })
