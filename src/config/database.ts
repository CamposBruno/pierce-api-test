import { Options } from 'sequelize'

const SequelizeOptions : Options = {
  dialect: 'postgres',
  host: process.env.SEQUELIZE_HOST,
  username: process.env.SEQUELIZE_USER,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
  define: {
    underscored: true,
    timestamps: true
  }
}

export default SequelizeOptions
