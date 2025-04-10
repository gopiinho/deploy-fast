import { create } from 'zustand'
import { Doc, Id } from '../../convex/_generated/dataModel'
import { persist } from 'zustand/middleware'

interface UserState {
  privyDid: string | undefined
  convexUserId: Id<'users'> | undefined
  projects: Doc<'projects'>[] | undefined
  activeProject: Doc<'projects'> | undefined
  hasProjects: boolean | undefined
  isLoading: boolean
  setPrivyDid: (did: string | undefined) => void
  setActiveProject: (project: Doc<'projects'>) => void
  _setProjects: (projects: Doc<'projects'>[] | undefined) => void
  _setLoading: (loading: boolean) => void
  _setConvexUserId: (id: Id<'users'> | undefined) => void
  _setHasProjects: (hasProjects: boolean | undefined) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      privyDid: undefined,
      convexUserId: undefined,
      projects: undefined,
      activeProject: undefined,
      hasProjects: undefined,
      isLoading: true,
      setPrivyDid: (did) =>
        set({
          privyDid: did,
        }),
      _setProjects: (projects) => {
        const currentActive = get().activeProject
        const latestProject =
          projects && projects.length > 0 ? projects[0] : undefined

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
