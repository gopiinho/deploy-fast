import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import slugify from 'slugify'

export const createProject = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('User not authenticated.')
    }

    const projectName = args.name.trim()
    if (!projectName) {
      throw new Error('Project name cannot be empty.')
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) =>
        q.eq('privyDid', identity.tokenIdentifier)
      )
      .first()

    if (!user) {
      console.error(
        `Failed to create project: Convex user not found for privy DID ${identity.tokenIdentifier}. AuthState might have failed or not run yet.`
      )
      throw new Error('User record not found. Please try again shortly.')
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

export const getProjectBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('projects')
      .withIndex('by_slug', (q) => q.eq('slug', args.slug))
      .first()
  },
})

export const getMyProjects = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []

    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) =>
        q.eq('privyDid', identity.tokenIdentifier)
      )
      .first()

    if (!user) return []

    return await ctx.db
      .query('projects')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .order('desc')
      .collect()
  },
})
