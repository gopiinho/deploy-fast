import { create } from 'zustand'
import { Doc, Id } from '../../convex/_generated/dataModel'
import { persist } from 'zustand/middleware'

interface UserState {
  privyDid: string | null
  convexUserId: Id<'users'> | null
  projects: Doc<'projects'>[] | null
  activeProject: Doc<'projects'> | null
  hasProjects: boolean | null
  isLoading: boolean
  setPrivyDid: (did: string | null) => void
  syncProjects: (did: string | null) => void
  setActiveProject: (project: Doc<'projects'>) => void
  _setProjects: (projects: Doc<'projects'>[] | null) => void
  _setLoading: (loading: boolean) => void
  _setConvexUserId: (id: Id<'users'> | null) => void
  _setHasProjects: (hasProjects: boolean | null) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      privyDid: null,
      convexUserId: null,
      projects: null,
      activeProject: null,
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
            activeProject: null,
            hasProjects: null,
            isLoading: false,
            convexUserId: null,
          })
          return
        }
        set({ isLoading: true })
      },
      _setProjects: (projects) => {
        const currentActive = get().activeProject
        const latestProject =
          projects && projects.length > 0 ? projects[0] : null

        set({
          projects: projects,
          activeProject: currentActive
            ? projects?.find((p) => p._id === currentActive._id) ||
              latestProject
            : latestProject,
          hasProjects: !!projects && projects.length > 0,
          isLoading: false,
        })
      },
      setActiveProject: (project) => set({ activeProject: project }),
      _setLoading: (loading) => set({ isLoading: loading }),
      _setConvexUserId: (id) => set({ convexUserId: id }),
      _setHasProjects: (hasProjects) => set({ hasProjects }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ activeProject: state.activeProject }),
    }
  )
)
