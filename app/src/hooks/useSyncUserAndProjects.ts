import { useEffect, useMemo, useRef } from 'react'
import { api } from '../../convex/_generated/api'
import { useQuery, useMutation } from 'convex/react'
import { usePrivy } from '@privy-io/react-auth'
import { useUserStore } from '@/state/userStore'

export const useSyncUserAndProjects = () => {
  const {
    setPrivyDid,
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

  const currentPrivyDid = useUserStore((state) => state.privyDid)
  const storeIsLoading = useUserStore((state) => state.isLoading)

  const createUser = useMutation(api.users.createUser)
  const createAttemptedForDid = useRef<string | null>(null)

  const privyDid = privyReady && privyAuthenticated ? privyUser?.id : null

  const userData = useQuery(
    api.users.getUserAndProjectCount,
    privyDid ? { privyDid } : 'skip'
  )

  const hasProjectsData = useQuery(
    api.projects.userHasProjects,
    privyDid ? { privyDid } : 'skip'
  )

  const projectsData = useQuery(
    api.projects.getUserProjects,
    privyDid ? { privyDid } : 'skip'
  )

  useEffect(() => {
    if (privyDid !== currentPrivyDid) {
      setPrivyDid(privyDid || null)
    }
  }, [privyDid, setPrivyDid, currentPrivyDid])

  useMemo(() => {
    if (
      privyReady &&
      privyAuthenticated &&
      privyUser &&
      privyDid &&
      userData === null &&
      createAttemptedForDid.current !== privyDid
    ) {
      createAttemptedForDid.current = privyDid
      createUser({
        privyDid: privyUser.id,
        email: privyUser.email?.address,
        name:
          privyUser.google?.name ??
          privyUser.twitter?.name ??
          privyUser.discord?.username ??
          privyUser.github?.username ??
          privyUser.linkedin?.name ??
          privyUser.email?.address ??
          'Anonymous',
        wallet: privyUser.wallet?.address,
      })
        .then((userId) => {
          console.log('Convex user creation successful. User ID:', userId)
        })
        .catch((error) => {
          console.error('Error creating/syncing user to Convex:', error)
        })
    }
  }, [
    privyReady,
    privyAuthenticated,
    privyUser,
    privyDid,
    userData,
    createUser,
  ])

  useEffect(() => {
    const loading =
      !privyReady ||
      (privyAuthenticated && !privyDid) ||
      (privyDid && projectsData === undefined) ||
      (privyDid && userData === undefined)
    if (loading !== storeIsLoading) {
      _setLoading(!!loading)
    }
    if (!loading && privyDid) {
      if (projectsData !== undefined) {
        _setProjects(projectsData)
      } else {
        _setProjects(null)
      }
      if (userData?.userId) {
        _setConvexUserId(userData.userId)
      } else {
        _setConvexUserId(null)
      }
      if (hasProjectsData !== undefined) {
        _setHasProjects(hasProjectsData)
      }
    } else if (!privyDid && !storeIsLoading) {
      setPrivyDid(null)
      _setProjects(null)
      _setConvexUserId(null)
      _setLoading(false)
    }
  }, [
    privyReady,
    privyAuthenticated,
    privyDid,
    projectsData,
    userData,
    storeIsLoading,
    hasProjectsData,
    _setLoading,
    _setProjects,
    setPrivyDid,
    _setConvexUserId,
    _setHasProjects,
  ])
}
