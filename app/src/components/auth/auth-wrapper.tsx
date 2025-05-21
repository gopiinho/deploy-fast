'use client'
import { useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useQuery } from 'convex/react'
import { useRouter, usePathname } from 'next/navigation'
import { api } from '../../../convex/_generated/api'
import { useSyncUserAndProjects } from '@/hooks/useSyncUserAndProjects'
import LoginState from './login-state'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter()
  const pathname = usePathname()
  const {
    ready: privyReady,
    authenticated: privyAuthenticated,
    user: privyUser,
  } = usePrivy()

  const privyDid = privyUser?.id

  useSyncUserAndProjects()

  const convexCoreProfile = useQuery(
    api.users.getUserCoreProfile,
    privyDid ? { privyDid } : 'skip'
  )

  useEffect(() => {
    // Rule 1: Wait for Privy to be ready.
    if (!privyReady) {
      return
    }

    if (privyAuthenticated && privyDid) {
      const isSignupPage = pathname === '/signup'

      if (convexCoreProfile === undefined && !isSignupPage) {
        return
      }

      if (
        convexCoreProfile === null ||
        (convexCoreProfile && !convexCoreProfile.hasEmail)
      ) {
        if (!isSignupPage) {
          router.push('/signup')
        }
      }
    }
  }, [
    privyReady,
    privyAuthenticated,
    privyDid,
    convexCoreProfile,
    router,
    pathname,
  ])
  return <LoginState>{children}</LoginState>
}
