import { prisma } from '../database/prisma.js'

class TagsController {
  async index(request, response) {
    const userId = request.user.id

    const tags = await prisma.tags.findMany({
      where: {
        id_users: userId,
      },
    })
    return response.status(200).json(tags)
  }
}

export { TagsController }
