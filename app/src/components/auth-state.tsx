'use client'
import { useEffect, useState } from 'react'
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
            createdAt: user.createdAt.toString(),
          })
        } catch (error) {
          console.error('Error syncing user to Convex:', error)
        }
      }
    }
    const checkWalletConnection = async () => {
      if (authenticated && !isConnected) {
        logout()
        disconnect()
      }
    }

    syncUserToConvex()
    checkWalletConnection()
  }, [authenticated, isConnected, hasChecked, user, createUser])

  return null
}
