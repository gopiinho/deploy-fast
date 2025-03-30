import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    privyDid: v.string(),
    email: v.optional(v.string()),
    name: v.string(),
    wallet: v.optional(v.string()),
  }).index('by_privyDid', ['privyDid']),
  projects: defineTable({
    userId: v.id('users'),
    name: v.string(),
  }).index('by_userId', ['userId']),
})
