import { mutation, query } from './_generated/server'
import { Doc } from './_generated/dataModel'
import { v } from 'convex/values'

export const createUser = mutation({
  args: {
    privyDid: v.string(),
    email: v.optional(v.string()),
    hasPro: v.boolean(),
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
      hasPro: args.hasPro,
    })

    return userId
  },
})

export const getUserCoreProfile = query({
  args: { privyDid: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .unique()

    if (!user) {
      return null
    }

    return {
      userId: user._id,
      hasEmail: !!user.email,
    }
  },
})

export const provisionUser = mutation({
  args: {
    privyDid: v.string(),
    email: v.string(),
    name: v.string(),
    wallet: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.email) {
      throw new Error('Email is required to provision a user account.')
    }

    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .unique()

    if (existingUser) {
      const patchData: Partial<Doc<'users'>> = {}
      if (args.email && args.email !== existingUser.email) {
        patchData.email = args.email
      }
      if (args.name && args.name !== existingUser.name) {
        patchData.name = args.name
      }
      if (Object.keys(patchData).length > 0) {
        await ctx.db.patch(existingUser._id, patchData)
      }
      return {
        userId: existingUser._id,
        isNew: false,
      }
    } else {
      const userId = await ctx.db.insert('users', {
        privyDid: args.privyDid,
        email: args.email,
        name: args.name,
        wallet: args.wallet,
        hasPro: false,
      })

      return { userId, isNew: true }
    }
  },
})

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
      return null
    }

    const projects = await ctx.db
      .query('projects')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()

    return { userId: user._id, projectCount: projects.length }
  },
})

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first()

    return user
  },
})

export const updateUserProAccess = mutation({
  args: {
    privyDid: v.string(),
    hasPro: v.boolean(),
    priceId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', args.privyDid))
      .unique()

    if (!user) {
      throw new Error('User not found')
    }

    await ctx.db.patch(user._id, {
      hasPro: args.hasPro,
      priceId: args.priceId,
    })
  },
})
