'use client'
import { useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { api } from '../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { useRouter, usePathname } from 'next/navigation'
import LoginState from './login-state'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const {
    authenticated: isPrivyAuthenticated,
    user: privyUser,
    ready: privyReady,
  } = usePrivy()
  const router = useRouter()
  const pathname = usePathname()

  const privyDid = privyUser?.id

  const hasProjectsResult = useQuery(
    api.projects.userHasProjects,
    privyDid ? { privyDid } : 'skip'
  )

  const isLoading =
    !privyReady ||
    (privyReady && isPrivyAuthenticated && !privyDid) ||
    (privyDid && hasProjectsResult === undefined)

  useEffect(() => {
    if (
      !privyReady ||
      !isPrivyAuthenticated ||
      !privyDid ||
      hasProjectsResult === undefined
    ) {
      return
    }

    const targetPath = hasProjectsResult ? '/contracts' : '/create-project'

    if (pathname !== targetPath) {
      console.log(
        `User ${hasProjectsResult ? 'has' : 'does not have'} projects. Redirecting to ${targetPath}`
      )
      router.push(targetPath)
    }
  }, [
    privyReady,
    isPrivyAuthenticated,
    privyDid,
    hasProjectsResult,
    router,
    pathname,
  ])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading authentication state...</p>
      </div>
    )
  }

  return (
    <>
      <LoginState>{children}</LoginState>
    </>
  )
}
