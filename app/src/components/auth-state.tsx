'use client'
import { useEffect, useState, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useAccount, useDisconnect } from 'wagmi'
import { api } from '../../convex/_generated/api'
import { useMutation } from 'convex/react'

export default function AuthState() {
  const [hasChecked, setHasChecked] = useState(false)
  const { user, authenticated, logout } = usePrivy()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const createUser = useMutation(api.users.createUser)

  const walletCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const previouslyConnected = useRef(false)

  useEffect(() => {
    if (!hasChecked) {
      setHasChecked(true)
      return
    }

    const syncUserToConvex = async () => {
      if (authenticated && user) {
        try {
          await createUser({
            privyDid: user.id,
            email: user.email?.address || undefined,
            name: user.google?.name || user.twitter?.name || 'Anonymous',
            wallet: user.wallet?.address || undefined,
          })
        } catch (error) {
          console.error('Error syncing user to Convex:', error)
        }
      }
    }

    if (walletCheckTimeoutRef.current) {
      clearTimeout(walletCheckTimeoutRef.current)
    }

    if (isConnected) {
      previouslyConnected.current = true
    }

    if (authenticated) {
      syncUserToConvex()

      walletCheckTimeoutRef.current = setTimeout(() => {
        if (!isConnected && previouslyConnected.current) {
          logout()
          disconnect()
          previouslyConnected.current = false
        }
      }, 2000)
    }
    return () => {
      if (walletCheckTimeoutRef.current) {
        clearTimeout(walletCheckTimeoutRef.current)
      }
    }
  }, [
    authenticated,
    isConnected,
    hasChecked,
    user,
    createUser,
    logout,
    disconnect,
  ])

  return null
}
