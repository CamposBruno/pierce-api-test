import { Sequelize, Model, DataTypes } from 'sequelize'
import SequelizeOptions from '../config/database'
export default class Groups extends Model {
    public id! : Number
    public name! : string
}

Groups.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING
}, {
  sequelize: new Sequelize(SequelizeOptions)
})
