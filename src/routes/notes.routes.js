import { Router } from 'express'

import { NotesController } from '../controllers/NotesController.js'
import { ensureAutheticated } from '../middlewares/ensureAuthenticated.js'

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use(ensureAutheticated)

notesRoutes.post('/', notesController.create)
notesRoutes.get('/', notesController.index)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)

export { notesRoutes }
