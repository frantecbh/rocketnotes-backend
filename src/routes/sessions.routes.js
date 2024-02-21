import { Router } from 'express'

import { SessionsController } from '../controllers/SessionsController.js'

const sessionController = new SessionsController()

const sessionsRoutes = Router()

sessionsRoutes.post('/', sessionController.create)

export { sessionsRoutes }
