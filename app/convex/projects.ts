import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import slugify from 'slugify'

export const createProject = mutation({
  args: {
    privyDid: v.string(),
    name: v.string(),
  },
  handler: async (ctx, { privyDid, name }) => {
    const projectName = name.trim()
    if (!projectName) {
      throw new Error('Project name cannot be empty.')
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', privyDid))
      .first()

    if (!user) {
      throw new Error('User not found.')
    }

    let slug = slugify(projectName, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    })

    const projectId = await ctx.db.insert('projects', {
      userId: user._id,
      name: projectName,
      slug: slug,
    })

    console.log(
      `Project '${projectName}' created with slug '${slug}' for user ${user._id}`
    )
    return {
      _id: projectId,
      slug: slug,
      name: projectName,
    }
  },
})

export const getMyProjects = query({
  args: {
    privyDid: v.string(),
  },
  handler: async (ctx, { privyDid }) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', privyDid))
      .first()

    if (!user) return []

    return await ctx.db
      .query('projects')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .order('desc')
      .collect()
  },
})
