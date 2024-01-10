import { prisma } from '../database/prisma.js'

class TagsController {
  async index(request, response) {
    const { idUser } = request.params

    const tags = await prisma.tags.findMany({
      where: {
        id_users: idUser,
      },
    })
    return response.status(200).json(tags)
  }
}

export { TagsController }
