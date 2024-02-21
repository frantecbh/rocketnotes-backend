import bcrypt from 'bcryptjs'
import { prisma } from '../database/prisma.js'
import { AppError } from '../utils/AppError.js'
import { authConfig } from '../configs/auth.js'
import jwt from 'jsonwebtoken'

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

    const { secret, expiresIn } = authConfig.jwt

    const token = jwt.sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    delete user.password

    return response.json({ user, token })
  }
}

export { SessionsController }
