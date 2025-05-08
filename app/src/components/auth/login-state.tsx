'use client'
import { useEffect, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useAccount, useDisconnect, useWalletClient } from 'wagmi'
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
  const { data: walletClient } = useWalletClient()

  const previouslyConnectedRef = useRef(false)
  const walletCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const initialLoadRef = useRef(true)

  useEffect(() => {
    if (privyReady && !privyAuthenticated && protectedRoute) {
      router.push('/')
    }
  }, [privyReady, privyAuthenticated, protectedRoute, router])

  const checkWalletState = async () => {
    if (walletClient) {
      try {
        await walletClient.getChainId()
        previouslyConnectedRef.current = true
        try {
          sessionStorage.setItem('walletWasConnected', 'true')
        } catch {}
      } catch {
        previouslyConnectedRef.current = false
        try {
          sessionStorage.removeItem('walletWasConnected')
        } catch {}
        if (privyAuthenticated && !initialLoadRef.current) {
          logout()
            .then(() => router.push('/'))
            .catch((err) => console.error('Privy logout failed:', err))
          disconnect()
        }
      }
    } else if (privyAuthenticated && !initialLoadRef.current) {
      previouslyConnectedRef.current = false
      try {
        sessionStorage.removeItem('walletWasConnected')
      } catch {}
      logout()
        .then(() => router.push('/'))
        .catch((err) => console.error('Privy logout failed:', err))
      disconnect()
    }
  }

  useEffect(() => {
    if (
      !privyReady ||
      !privyAuthenticated ||
      !isConnected ||
      !address ||
      !user
    ) {
      return
    }

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
    }
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

  useEffect(() => {
    const cleanup = () => {
      if (walletCheckTimeoutRef.current) {
        clearTimeout(walletCheckTimeoutRef.current)
        walletCheckTimeoutRef.current = null
      }
    }

    if (!privyReady) {
      return cleanup
    }

    if (privyAuthenticated) {
      checkWalletState()
    } else {
      previouslyConnectedRef.current = false
      try {
        sessionStorage.removeItem('walletWasConnected')
      } catch {}
    }

    if (initialLoadRef.current) {
      initialLoadRef.current = false
    }

    return cleanup
  }, [privyReady, privyAuthenticated, walletClient, router, checkWalletState])

  if (protectedRoute && (!privyReady || !privyAuthenticated)) {
    return null
  }

  return <>{children}</>
}
