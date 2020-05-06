import * as express from 'express'

import Auth from './auth'
import SignupController from './controllers/SignupController'
import SignupValidation from './validations/SignupValidation'
import LoginController from './controllers/LoginController'
import LoginValidation from './validations/LoginValidation'
import ResetPasswordController from './controllers/ResetPasswordController'
import ResetPasswordValidation from './validations/ResetPasswordValidation'
import ItemsController from './controllers/ItemsController'
import ItemsValidation from './validations/ItemsValidations'
import GroupsController from './controllers/GroupsController'
import GroupsValidation from './validations/GroupsValidation'

export default class Routes {
    public routes = express.Router();

    constructor () {
      this.intializeRoutes()
    }

    private intializeRoutes () {
      this.routes.post('/signup', new SignupValidation().store, new SignupController().store)
      this.routes.post('/login', new LoginValidation().store, new LoginController().store)

      // Logged in routes
      this.routes.use(new Auth().authenticate)
      this.routes.post('/resetPassword', new ResetPasswordValidation().reset, new ResetPasswordController().reset)
      this.routes.get('/items/:item_id', new ItemsValidation().show, new ItemsController().show)
      this.routes.get('/items', new ItemsValidation().index, new ItemsController().index)
      this.routes.post('/items', new ItemsValidation().store, new ItemsController().store)
      this.routes.delete('/items/:item_id', new ItemsValidation().destroyOne, new ItemsController().destroyOne)
      this.routes.delete('/items', new ItemsValidation().destroyMany, new ItemsController().destroyMany)
      this.routes.put('/items/:item_id', new ItemsValidation().update, new ItemsController().update)
      this.routes.get('/groups', new GroupsValidation().index, new GroupsController().index)
    }
}
