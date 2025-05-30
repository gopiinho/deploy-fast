import { useEffect } from 'react'
import { api } from '../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { usePrivy } from '@privy-io/react-auth'
import { useUserStore } from '@/state/userStore'

export const useSyncUserAndProjects = () => {
  const {
    privyDid: currentPrivyDidFromStore,
    isLoading: storeIsLoading,
    setPrivyDid,
    setUser,
    _setConvexUserId,
    _setProjects,
    _setLoading,
    _setHasProjects,
  } = useUserStore()

  const {
    user: privyUser,
    ready: privyReady,
    authenticated: privyAuthenticated,
  } = usePrivy()

  const privyDidFromAuth =
    privyReady && privyAuthenticated ? privyUser?.id : undefined

  const getUserAndProjectsData = useQuery(
    api.users.getUserAndProjectsData,
    privyDidFromAuth ? { privyDid: privyDidFromAuth } : 'skip'
  )

  const projectsData = useQuery(
    api.projects.getUserProjects,
    privyDidFromAuth ? { privyDid: privyDidFromAuth } : 'skip'
  )

  useEffect(() => {
    if (privyDidFromAuth !== currentPrivyDidFromStore) {
      setPrivyDid(privyDidFromAuth || undefined)
    }
  }, [privyDidFromAuth, setPrivyDid, currentPrivyDidFromStore])

  useEffect(() => {
    if (!privyReady) {
      if (!storeIsLoading) _setLoading(true)
      return
    }

    if (privyAuthenticated && privyDidFromAuth) {
      const stillFetchingConvexData =
        getUserAndProjectsData === undefined || projectsData === undefined

      if (stillFetchingConvexData) {
        if (!storeIsLoading) _setLoading(true)
        return
      }

      if (storeIsLoading) _setLoading(false)

      setUser(getUserAndProjectsData?.user || undefined)
      _setConvexUserId(getUserAndProjectsData?.userId || undefined)
      _setProjects(projectsData || undefined)
      _setHasProjects(getUserAndProjectsData?.hasProjects || false)
    } else {
      if (storeIsLoading) _setLoading(false)
      _setConvexUserId(undefined)
      _setProjects(undefined)
      _setHasProjects(false)
    }
  }, [
    privyReady,
    privyAuthenticated,
    privyDidFromAuth,
    getUserAndProjectsData,
    projectsData,
    storeIsLoading,
    setUser,
    _setLoading,
    _setProjects,
    _setConvexUserId,
    _setHasProjects,
  ])
}
