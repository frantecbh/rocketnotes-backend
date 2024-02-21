import { Router } from 'express'
import { UsersControllers } from '../controllers/UsersControllers.js'
import { ensureAutheticated } from '../middlewares/ensureAuthenticated.js'

const userRoutes = Router()

const usersContrller = new UsersControllers()

userRoutes.post('/', usersContrller.create)
userRoutes.put('/', ensureAutheticated, usersContrller.update)

export { userRoutes }
