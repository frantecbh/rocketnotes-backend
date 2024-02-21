import { prisma } from '../database/prisma.js'

class NotesController {
  async index(request, response) {
    const { title, tags } = request.query

    const userId = request.user.id

    let notes

    if (tags) {
      const filterTags = tags.split(',').map((tag) => tag.trim())
      notes = await prisma.tags.findMany({
        where: {
          name: {
            in: filterTags.map((tag) => tag),
          },

          id_users: userId,
        },

        include: {
          Notes: {
            select: {
              title: true,
            },
          },
        },
      })
    } else {
      notes = await prisma.notes.findMany({
        where: {
          id_users: userId,
          title: {
            contains: title,
          },
        },
      })
    }

    const userTags = await prisma.tags.findMany({
      where: { id_users: userId },
    })

    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.id_notes === note.id_notes)

      return {
        ...note,
        tags: noteTags,
      }
    })

    return response.status(200).json(notesWithTags)
  }

  async create(request, response) {
    const { title, description, tags, links } = request.body
    const userId = request.user.id

    const noteId = await prisma.notes.create({
      data: {
        title,
        description,
        id_users: userId,
      },
    })

    for (const x in links) {
      await prisma.links.create({
        data: {
          id_notes: noteId.id,
          url: links[x],
        },
      })
    }

    for (const x in tags) {
      await prisma.tags.create({
        data: {
          id_users: userId,
          id_notes: noteId.id,
          name: tags[x],
        },
      })
    }

    return response.status(201).json()
  }

  async show(request, response) {
    const { id } = request.params

    const note = await prisma.notes.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        link: true,
      },
    })

    return response.status(200).json(note)
  }

  async delete(request, response) {
    const { id } = request.params

    await prisma.notes.delete({
      where: {
        id,
      },
    })

    return response.status(200).json()
  }
}

export { NotesController }
