import { mutation, query } from './_generated/server'
import { Doc } from './_generated/dataModel'
import { v } from 'convex/values'

export const createUser = mutation({
  args: {
    privyDid: v.string(),
    email: v.optional(v.string()),
    name: v.string(),
    wallet: v.optional(v.string()),
  },
  handler: async (ctx, { privyDid, email, name, wallet }) => {
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', privyDid))
      .first()

    if (existingUser) {
      return existingUser._id
    } else {
      const userId = await ctx.db.insert('users', {
        privyDid,
        email,
        name,
        wallet,
      })
      return userId
    }
  },
})

export const getUserAndProjectCount = query({
  args: {
    privyDid: v.string(),
  },
  handler: async (ctx, { privyDid }) => {
    const user: Doc<'users'> | null = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', privyDid))
      .first()

    if (!user) {
      console.warn(`User not found for privyDid: ${privyDid}`)
      return null
    }

    const projects = await ctx.db
      .query('projects')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()

    return { userId: user._id, projectCount: projects.length }
  },
})

export const getMyUser = query({
  args: { privyDid: v.string() },
  handler: async (ctx, { privyDid }) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', privyDid))
      .unique()
    return user
  },
})
