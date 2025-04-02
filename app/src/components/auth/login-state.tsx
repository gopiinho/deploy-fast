'use client'
import { useEffect, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useAccount, useDisconnect } from 'wagmi'
import { api } from '../../../convex/_generated/api'
import { useMutation } from 'convex/react'

export default function LoginState({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    ready: privyReady,
    user: privyUser,
    authenticated: privyAuthenticated,
    logout,
  } = usePrivy()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const createUser = useMutation(api.users.createUser)

  const previouslyConnectedRef = useRef(false)
  const syncAttemptedInSessionRef = useRef(false)
  const walletCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const cleanup = () => {
      if (walletCheckTimeoutRef.current) {
        clearTimeout(walletCheckTimeoutRef.current)
        walletCheckTimeoutRef.current = null
      }
    }
    cleanup()

    if (!privyReady) {
      return cleanup
    }

    if (privyAuthenticated && privyUser) {
      if (!syncAttemptedInSessionRef.current) {
        syncAttemptedInSessionRef.current = true

        createUser({
          privyDid: privyUser.id,

          email: privyUser.email?.address,
          name:
            privyUser.google?.name ??
            privyUser.twitter?.name ??
            privyUser.email?.address ??
            'Anonymous',
          wallet: privyUser.wallet?.address,
        })
          .then((userId) => {
            console.log(
              'Convex user sync/create successful or user exists. User ID:',
              userId
            )
          })
          .catch((error) => {
            console.error('Error syncing user to Convex:', error)
          })
      }

      if (isConnected) {
        previouslyConnectedRef.current = true
      }
      if (walletCheckTimeoutRef.current)
        clearTimeout(walletCheckTimeoutRef.current)

      walletCheckTimeoutRef.current = setTimeout(() => {
        if (!isConnected && previouslyConnectedRef.current) {
          console.log(
            'Wallet disconnected after being connected during session. Logging out Privy and disconnecting wallet.'
          )
          previouslyConnectedRef.current = false
          syncAttemptedInSessionRef.current = false
          logout().catch((err) => console.error('Privy logout failed:', err))
          disconnect()
        }
        walletCheckTimeoutRef.current = null
      }, 2000)
    } else {
      previouslyConnectedRef.current = false
      syncAttemptedInSessionRef.current = false
    }

    return cleanup
  }, [
    privyReady,
    privyAuthenticated,
    privyUser,
    isConnected,
    createUser,
    logout,
    disconnect,
  ])
  return <>{children}</>
}
