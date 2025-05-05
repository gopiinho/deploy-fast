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
    slug: v.optional(v.string()),
  })
    .index('by_userId', ['userId'])
    .index('by_slug', ['slug'])
    .index('by_user_slug', ['userId', 'slug']),

  contracts: defineTable({
    projectId: v.id('projects'),
    address: v.string(),
    type: v.string(),
    name: v.optional(v.string()),
  })
    .index('by_projectId', ['projectId'])
    .index('by_address', ['address']),
})
