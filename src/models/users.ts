import { Sequelize, Model, DataTypes } from 'sequelize'
import hashPassword from '../services/hashPassword'
import SequelizeOptions from '../config/database'

export default class Users extends Model {
    public id! : Number
    public email! : string
    public password_hash! : string
}

Users.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  email: DataTypes.STRING,
  password_hash: DataTypes.STRING
}, {
  sequelize: new Sequelize(SequelizeOptions),
  hooks: {
    beforeCreate: async (user: Users, options: any) => {
      const hashedPassword = await hashPassword(user.password_hash)
      user.password_hash = hashedPassword
    }
  }
})
