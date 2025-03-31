import { mutation, query } from './_generated/server'
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

export const getMyUserAndProjectCount = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return null
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) =>
        q.eq('privyDid', identity.tokenIdentifier)
      )
      .first()

    if (!user) {
      console.warn(
        `User ${identity.tokenIdentifier} authenticated but Convex record not found yet.`
      )
      return { userId: null, projectCount: 0 }
    }

    const projects = await ctx.db
      .query('projects')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()
    return { userId: user._id, projectCount: projects.length }
  },
})

export const getMyUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) return null

    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) =>
        q.eq('privyDid', identity.tokenIdentifier)
      )
      .unique()
    return user
  },
})
