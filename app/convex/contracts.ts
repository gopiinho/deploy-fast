import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const createContract = mutation({
  args: {
    projectId: v.id('projects'),
    address: v.string(),
    type: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('contracts', {
      projectId: args.projectId,
      address: args.address,
      type: args.type,
      name: args.name,
    })
  },
})

export const getProjectContracts = query({
  args: {
    userId: v.id('users'),
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query('projects')
      .withIndex('by_userId', (q) => q.eq('userId', args.userId))
      .first()

    if (!project) {
      throw new Error('Project not found!')
    }

    return await ctx.db
      .query('contracts')
      .withIndex('by_projectId', (q) => q.eq('projectId', project._id))
      .filter((q) => q.eq(q.field('projectId'), args.projectId))
      .order('asc')
      .collect()
  },
})
