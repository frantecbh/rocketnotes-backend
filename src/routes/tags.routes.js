import { Router } from 'express'

import { TagsController } from '../controllers/TagsController.js'
import { ensureAutheticated } from '../middlewares/ensureAuthenticated.js'

const tagsRoutes = Router()

const notesController = new TagsController()

tagsRoutes.get('/', ensureAutheticated, notesController.index)

export { tagsRoutes }
