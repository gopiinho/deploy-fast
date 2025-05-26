'use client'
import { useState, useEffect, FormEvent } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useMutation, useQuery } from 'convex/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/state/userStore'
import { extractConvexError } from '@/lib/extractConvexError'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    setPrivyDid,
    _setConvexUserId,
    _setLoading: setStoreLoading,
  } = useUserStore()

  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    user: privyUser,
    ready: privyReady,
    authenticated: privyAuthenticated,
    logout,
  } = usePrivy()

  const provisionUserMutation = useMutation(api.users.provisionUser)

  const convexUserData = useQuery(
    api.users.getUserCoreProfile,
    privyReady && privyAuthenticated && privyUser?.id
      ? { privyDid: privyUser.id }
      : 'skip'
  )

  useEffect(() => {
    if (privyReady) {
      if (!privyAuthenticated || !privyUser) {
        router.push('/')
        return
      }

      if (typeof convexUserData !== 'undefined') {
        if (convexUserData && convexUserData.hasEmail) {
          const hasExplicitReasonToStay =
            searchParams.get('reason') || searchParams.get('redirect')
          if (!hasExplicitReasonToStay) {
            router.push('/projects')
            return
          }
        }
      }

      const initialName =
        privyUser.google?.name ??
        privyUser.twitter?.name ??
        privyUser.discord?.username ??
        privyUser.github?.username ??
        privyUser.linkedin?.name ??
        (privyUser.email?.address
          ? privyUser.email.address.split('@')[0]
          : '') ??
        ''
      const initialEmail = privyUser.google?.email ?? ''

      setName(initialName)
      setEmail(initialEmail)
    }
  }, [
    privyReady,
    privyAuthenticated,
    privyUser,
    router,
    convexUserData,
    searchParams,
  ])

  const handleLogout = async () => {
    setIsLoading(true)
    if (setStoreLoading) setStoreLoading(true)
    try {
      await logout()
    } catch (e) {
      console.error('Logout failed', e)
    } finally {
      setIsLoading(false)
      if (setStoreLoading) setStoreLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!privyUser?.id) {
      setError('User session is invalid. Please log in again.')
      return
    }
    if (!email.trim()) {
      setError('Email address is required.')
      return
    }
    if (!name.trim()) {
      setError('Your name is required.')
      return
    }

    setIsLoading(true)
    setError(null)
    if (setStoreLoading) setStoreLoading(true)

    try {
      const result = await provisionUserMutation({
        privyDid: privyUser.id,
        email: email.trim(),
        name: name.trim(),
        wallet: privyUser.wallet?.address,
      })

      if (result && result.userId) {
        if (setPrivyDid) setPrivyDid(privyUser.id)
        if (_setConvexUserId) _setConvexUserId(result.userId)

        const redirectPath = searchParams.get('redirect') || '/projects'
        router.push(redirectPath)
      } else {
        throw new Error('Profile could not be saved. Please try again.')
      }
    } catch (err) {
      console.error('Signup/Profile completion error:', err)
      setError(
        err instanceof Error
          ? err.message
          : typeof err === 'object' &&
              err !== null &&
              'data' in err &&
              typeof err.data === 'object' &&
              err.data !== null &&
              'message' in err.data
            ? String(err.data.message)
            : 'An unexpected error occurred.'
      )
    } finally {
      setIsLoading(false)
      if (setStoreLoading) setStoreLoading(false)
    }
  }

  if (privyReady && !privyAuthenticated) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center">
        Please log in to complete your profile.{' '}
        <Button onClick={() => router.push('/login')}>Go to Login</Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-start">
      <div className="flex w-full items-center justify-between border-b px-4 py-10">
        <h3 className="hidden text-2xl font-semibold max-sm:block lg:text-4xl">
          Get started
        </h3>
        <h3 className="text-2xl font-semibold max-sm:hidden lg:text-4xl">
          Get started with DeployFast
        </h3>
        <Button variant={'outline'} onClick={handleLogout} disabled={isLoading}>
          Logout
        </Button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="my-4 flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-2xl border sm:m-4 lg:w-[40%]"
      >
        <div className="bg-card w-full border-b p-6 text-lg font-semibold">
          {convexUserData?.hasEmail ? 'Update Your Profile' : 'Create Account'}
        </div>
        <div className="grid w-full gap-8 px-6 py-8">
          <div className="grid gap-1">
            <label htmlFor="signup-name" className="font-semibold">
              Name <span className="text-red-400">*</span>
            </label>
            <Input
              id="signup-name"
              className="bg-background"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="signup-email" className="font-semibold">
              Email <span className="text-red-400">*</span>
            </label>
            <Input
              id="signup-email"
              type="email"
              className="bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="min-h-[2rem] px-1">
            {error ? (
              <p className="text-sm text-red-500">
                {extractConvexError(error)}
              </p>
            ) : (
              <p className="invisible text-sm"></p>
            )}
          </div>
        </div>
        <div className="flex w-full justify-end border-t px-6 py-8">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save and Continue'}
          </Button>
        </div>
      </form>
    </div>
  )
}
