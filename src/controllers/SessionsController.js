import bcrypt from 'bcryptjs'
import { prisma } from '../database/prisma.js'
import { AppError } from '../utils/AppError.js'

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new AppError('Email e/ou senha incorreta', 401)
    }

    const passwordMatched = await bcrypt.compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Email e/ou senha incorreta', 401)
    }

    return response.json(user)
  }
}

export { SessionsController }
