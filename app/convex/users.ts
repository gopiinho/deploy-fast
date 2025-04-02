import { mutation, query } from './_generated/server'
import { Doc } from './_generated/dataModel'
import { v } from 'convex/values'

export const getUserByPrivyDid = query({
  args: { privyDid: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .unique()
    return user
  },
})

export const getUser = query({
  args: { privyDid: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .unique()
    return user
  },
})

export const createUser = mutation({
  args: {
    privyDid: v.string(),
    email: v.optional(v.string()),
    name: v.string(),
    wallet: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .unique()

    if (existingUser) {
      return existingUser._id
    }
    const userId = await ctx.db.insert('users', {
      privyDid: args.privyDid,
      email: args.email,
      name: args.name,
      wallet: args.wallet,
    })
    return userId
  },
})

export const getUserAndProjectCount = query({
  args: {
    privyDid: v.string(),
  },
  handler: async (ctx, args) => {
    const user: Doc<'users'> | null = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .first()

    if (!user) {
      console.warn(`User not found for privyDid: ${args.privyDid}`)
      return null
    }

    const projects = await ctx.db
      .query('projects')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()

    return { userId: user._id, projectCount: projects.length }
  },
})
