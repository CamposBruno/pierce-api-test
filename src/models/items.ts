import { Sequelize, Model, DataTypes } from 'sequelize'
import SequelizeOptions from '../config/database'
import User from './users'

export default class Items extends Model {
    public id! : Number
    public name! : string
    public user_id! : Number
}

Items.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING,
  user_id: DataTypes.INTEGER.UNSIGNED
}, {
  sequelize: new Sequelize(SequelizeOptions)
})

Items.belongsTo(User, { foreignKey: 'user_id' })
