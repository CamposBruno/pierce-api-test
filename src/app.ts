import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import Routes from './routes'

class App {
  public server: express.Application

  constructor () {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(helmet())
  }

  routes () {
    this.server.use(new Routes().routes)
  }
}

new App().server.listen(3000, () => console.log('App running on port 3000'))
