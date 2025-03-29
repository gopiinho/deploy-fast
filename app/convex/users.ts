import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const createUser = mutation({
  args: {
    privyDid: v.string(),
    email: v.optional(v.string()),
    name: v.string(),
    createdAt: v.string(),
  },
  handler: async (ctx, { privyDid, email, name, createdAt }) => {
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_privyDid', (q) => q.eq('privyDid', privyDid))
      .first()
    if (!existingUser) {
      await ctx.db.insert('users', {
        privyDid,
        email,
        name,
        createdAt,
      })
    }
  },
})
