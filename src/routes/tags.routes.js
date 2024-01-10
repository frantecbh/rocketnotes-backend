import { Router } from 'express'

import { TagsController } from '../controllers/TagsController.js'

const tagsRoutes = Router()

const notesController = new TagsController()

tagsRoutes.get('/:idUser', notesController.index)

export { tagsRoutes }
