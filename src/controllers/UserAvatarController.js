import { prisma } from '../database/prisma.js'
import { DiskStorage } from '../providers/DiskStorage.js'
import { AppError } from '../utils/AppError.js'

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id
    const avatarFilename = request.file.filename

    console.log(`nome do arquivo: ${avatarFilename}`)

    const diskStorage = new DiskStorage()

    const user = await prisma.users.findFirst({
      where: {
        id: user_id,
      },
    })

    if (!user) {
      throw new AppError('Usuário não authenticado', 401)
    }

    if (user.avatar) {
      console.log(user.avatar)
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)

    // user.avatar = filename

    await prisma.users.update({
      where: {
        id: user_id,
      },
      data: {
        avatar: avatarFilename,
      },
    })

    delete user.password

    return response.json(user)
  }
}

export { UserAvatarController }
