import { Router } from 'express'
import { userRoutes } from './user.routes.js'
import { notesRoutes } from './notes.routes.js'
import { tagsRoutes } from './tags.routes.js'

const routes = Router()

routes.use('/users', userRoutes)

routes.use('/notes', notesRoutes)

routes.use('/tags', tagsRoutes)

export { routes }
