import { Router } from 'express'
import { UsersControllers } from '../controllers/UsersControllers.js'
import { ensureAutheticated } from '../middlewares/ensureAuthenticated.js'
import multer from 'multer'
import { uploadConfig } from '../configs/upload.js'
import { UserAvatarController } from '../controllers/UserAvatarController.js'

const userRoutes = Router()

const upload = multer(uploadConfig.MULTER)

const userAvatarController = new UserAvatarController()
const usersContrller = new UsersControllers()

userRoutes.post('/', usersContrller.create)
userRoutes.put('/', ensureAutheticated, usersContrller.update)
userRoutes.patch(
  '/avatar',
  ensureAutheticated,
  upload.single('avatar'),
  userAvatarController.update,
)

export { userRoutes }
