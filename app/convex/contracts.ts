import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { Doc } from './_generated/dataModel'

export const createContract = mutation({
  args: {
    projectId: v.id('projects'),
    address: v.string(),
    chainId: v.number(),
    type: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId)

    if (!project) {
      throw new Error('Project not found')
    }

    const user = await ctx.db.get(project.userId)

    if (!user) {
      throw new Error('User not found')
    }

    if (!user.hasPro) {
      const existingContracts = await ctx.db
        .query('contracts')
        .withIndex('by_projectId', (q) => q.eq('projectId', args.projectId))
        .collect()

      if (existingContracts.length >= 10) {
        throw new Error('Free tier can only create 10 contracts per project.')
      }
    }

    return await ctx.db.insert('contracts', {
      projectId: args.projectId,
      address: args.address,
      chainId: args.chainId,
      type: args.type,
      name: args.name,
    })
  },
})

export const getContractBySlugAndAddress = query({
  args: {
    privyDid: v.string(),
    projectSlug: v.string(),
    contractAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const user: Doc<'users'> | null = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .unique()

    if (!user) {
      console.warn(`User with privyDid ${args.privyDid} not found.`)
      return null
    }

    const project: Doc<'projects'> | null = await ctx.db
      .query('projects')
      .withIndex('by_user_slug', (q) =>
        q.eq('userId', user._id).eq('slug', args.projectSlug)
      )
      .unique()

    if (!project) {
      console.log(
        `Project with slug "${args.projectSlug}" not found for user ${user._id}.`
      )
      return null
    }

    if (project.userId !== user._id) {
      console.error(
        `Authorization mismatch: Query returned project ${project._id} not owned by user ${user._id}!`
      )
      return null
    }

    const contract: Doc<'contracts'> | null = await ctx.db
      .query('contracts')
      .withIndex('by_projectId', (q) => q.eq('projectId', project._id))
      .filter((q) => q.eq(q.field('address'), args.contractAddress))
      .unique()

    if (!contract) {
      console.log(
        `Contract with address "${args.contractAddress}" not found in project ${project._id}.`
      )
      return null
    }

    return contract
  },
})

export const getProjectContracts = query({
  args: {
    userId: v.id('users'),
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId)

    if (!project || project.userId !== args.userId) {
      throw new Error('Project not found or unauthorized!')
    }

    return await ctx.db
      .query('contracts')
      .withIndex('by_projectId', (q) => q.eq('projectId', project._id))
      .order('desc')
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
