import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const createProject = mutation({
  args: {
    userId: v.id('users'),
    name: v.string(),
  },
  handler: async ({ db }, { userId, name }) => {
    const user = await db.get(userId)
    if (!user) {
      throw new Error('User not found')
    }
    const projectId = await db.insert('projects', {
      userId,
      name,
    })

    return projectId
  },
})
