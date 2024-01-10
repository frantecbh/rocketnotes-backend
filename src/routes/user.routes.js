import { Router } from 'express'
import { UsersControllers } from '../controllers/UsersControllers.js'

const userRoutes = Router()

const usersContrller = new UsersControllers()

userRoutes.post('/', usersContrller.create)
userRoutes.put('/:id', usersContrller.update)

export { userRoutes }
