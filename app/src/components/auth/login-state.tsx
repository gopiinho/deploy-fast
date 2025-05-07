'use client'
import { useEffect, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useAccount, useDisconnect } from 'wagmi'
import { useRouter } from 'next/navigation'

export default function LoginState({
  children,
  protectedRoute = false,
}: {
  children: React.ReactNode
  protectedRoute?: boolean
}) {
  const router = useRouter()
  const {
    ready: privyReady,
    authenticated: privyAuthenticated,
    logout,
    user,
  } = usePrivy()
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()

  const previouslyConnectedRef = useRef(false)
  const walletCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (privyReady && !privyAuthenticated && protectedRoute) {
      router.push('/')
    }
  }, [privyReady, privyAuthenticated, protectedRoute, router])

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

    if (privyAuthenticated && isConnected && address && user) {
      const linkedWallets = user.linkedAccounts?.filter(
        (account) => account.type === 'wallet'
      )

      const isAuthorizedWallet = linkedWallets?.some(
        (wallet) => wallet.address?.toLowerCase() === address.toLowerCase()
      )

      if (!isAuthorizedWallet) {
        logout()
          .then(() => router.push('/'))
          .catch((err) => console.error('Privy logout failed:', err))
        disconnect()
        return cleanup
      }
    }

    if (privyAuthenticated) {
      if (isConnected) {
        previouslyConnectedRef.current = true
        try {
          sessionStorage.setItem('walletWasConnected', 'true')
        } catch {}
      } else if (previouslyConnectedRef.current) {
        previouslyConnectedRef.current = false
        try {
          sessionStorage.removeItem('walletWasConnected')
        } catch {}
        logout()
          .then(() => router.push('/'))
          .catch((err) => console.error('Privy logout failed:', err))
        disconnect()
      } else if (!isConnected) {
        try {
          sessionStorage.getItem('walletWasConnected')
        } catch {}
      }
    } else {
      previouslyConnectedRef.current = false
      try {
        sessionStorage.removeItem('walletWasConnected')
      } catch {}
    }

    return cleanup
  }, [
    privyReady,
    privyAuthenticated,
    isConnected,
    address,
    user,
    logout,
    disconnect,
    router,
  ])

  if (protectedRoute && (!privyReady || !privyAuthenticated)) {
    return null
  }

  return <>{children}</>
}
