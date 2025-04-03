import { create } from 'zustand'
import { Doc, Id } from '../../convex/_generated/dataModel'

interface UserState {
  privyDid: string | null
  convexUserId: Id<'users'> | null
  projects: Doc<'projects'>[] | null
  hasProjects: boolean | null
  isLoading: boolean
  setPrivyDid: (did: string | null) => void
  syncProjects: (did: string | null) => void
  _setProjects: (projects: Doc<'projects'>[] | null) => void
  _setLoading: (loading: boolean) => void
  _setConvexUserId: (id: Id<'users'> | null) => void
  _setHasProjects: (hasProjects: boolean | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  privyDid: null,
  convexUserId: null,
  projects: null,
  hasProjects: null,
  isLoading: true,
  setPrivyDid: (did) =>
    set({
      privyDid: did,
    }),
  syncProjects: async (did) => {
    if (!did) {
      set({
        projects: null,
        hasProjects: null,
        isLoading: false,
        convexUserId: null,
      })
      return
    }
    set({ isLoading: true })
  },
  _setProjects: (projects) =>
    set({
      projects: projects,
      hasProjects: !!projects && projects.length > 0,
      isLoading: false,
    }),
  _setLoading: (loading) => set({ isLoading: loading }),
  _setConvexUserId: (id) => set({ convexUserId: id }),
  _setHasProjects: (hasProjects) => set({ hasProjects }),
}))
