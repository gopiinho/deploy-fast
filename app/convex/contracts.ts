import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const createContract = mutation({
  args: {
    projectId: v.id('projects'),
    address: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('contracts', {
      projectId: args.projectId,
      address: args.address,
      name: args.name,
    })
  },
})

export const getProjectContracts = query({
  args: {
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('contracts')
      .filter((q) => q.eq(q.field('projectId'), args.projectId))
      .collect()
  },
})
