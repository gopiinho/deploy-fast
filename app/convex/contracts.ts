import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { Doc, Id } from './_generated/dataModel'

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

export const deleteContract = mutation({
  args: {
    contractId: v.id('contracts'),
    privyDid: v.string(),
  },
  handler: async (ctx, args) => {
    const user: Doc<'users'> | null = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .unique()

    if (!user) {
      throw new Error('User not found.')
    }

    const contract: Doc<'contracts'> | null = await ctx.db.get(args.contractId)

    if (!contract) {
      throw new Error('Contract not found.')
    }

    const project: Doc<'projects'> | null = await ctx.db.get(contract.projectId)

    if (!project) {
      throw new Error('Associated project not found.')
    }

    if (project.userId !== user._id) {
      throw new Error(
        'Unauthorized: You do not own the project this contract belongs to.'
      )
    }

    await ctx.db.delete(args.contractId)

    return { success: true }
  },
})
