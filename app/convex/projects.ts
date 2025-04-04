import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import slugify from 'slugify'

export const createProject = mutation({
  args: {
    privyDid: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const projectName = args.name.trim()
    if (!projectName) {
      throw new Error('Project name cannot be empty.')
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
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

    return {
      _id: projectId,
      slug: slug,
      name: projectName,
    }
  },
})

export const getUserProjects = query({
  args: {
    privyDid: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .first()

    if (!user) return []

    return await ctx.db
      .query('projects')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .order('desc')
      .collect()
  },
})

export const userHasProjects = query({
  args: {
    privyDid: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .first()

    if (!user) return false

    const projects = await ctx.db
      .query('projects')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .first()

    return projects !== null
  },
})

export const deleteProject = mutation({
  args: {
    projectId: v.id('projects'),
    privyDid: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .first()

    if (!user) {
      throw new Error('User not found.')
    }

    const project = await ctx.db.get(args.projectId)

    if (!project) {
      throw new Error('Project not found.')
    }

    if (project.userId !== user._id) {
      throw new Error('Unauthorized to delete this project.')
    }

    await ctx.db.delete(args.projectId)

    return { success: true }
  },
})
