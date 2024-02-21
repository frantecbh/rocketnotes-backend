import bcrypt from 'bcryptjs'
import { prisma } from '../database/prisma.js'
import { AppError } from '../utils/AppError.js'

class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body

    if (!name || !email || !password) {
      throw new AppError('Todos os campos devem ser preenchidos!')
    }

    const userExists = await prisma.users.findFirst({
      where: {
        email,
      },
    })

    if (userExists) {
      throw new AppError('Usuário já cadastrado!')
    }

    const passwrdHashd = await bcrypt.hash(password, 8)

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: passwrdHashd,
      },
    })

    return response.status(201).json()
  }

  async update(request, response) {
    const user_id = request.user.id

    const { name, email, password, oldPassword } = request.body

    const user = await prisma.users.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    const userWithUpdateEmail = await prisma.users.findFirst({
      where: {
        email,
      },
    })

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError('Este email ja esta em uso por outro usuário')
    }

    if (password && !oldPassword) {
      throw new AppError('Senha antiga precisa ser informada!')
    }

    if (password && oldPassword) {
      const checkOldPassowrd = await bcrypt.compare(oldPassword, user.password)

      if (!checkOldPassowrd) {
        throw new AppError('Senha antiga não confere!')
      }
    }

    const passwrdHashd = await bcrypt.hash(password, 8)

    await prisma.users.update({
      data: {
        name: user.name,
        email: user.email,
        password: passwrdHashd,
      },
      where: {
        id: user_id,
      },
    })

    return response.status(200).json()
  }
}

export { UsersControllers }
