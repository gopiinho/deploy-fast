'use client'
import { useEffect, useRef } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useAccount, useDisconnect } from 'wagmi'

export default function LoginState({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    ready: privyReady,
    authenticated: privyAuthenticated,
    logout,
  } = usePrivy()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const previouslyConnectedRef = useRef(false)
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

    if (privyAuthenticated) {
      if (isConnected) {
        previouslyConnectedRef.current = true
      }

      if (walletCheckTimeoutRef.current) {
        clearTimeout(walletCheckTimeoutRef.current)
        walletCheckTimeoutRef.current = null
      }

      walletCheckTimeoutRef.current = setTimeout(() => {
        if (!isConnected && previouslyConnectedRef.current) {
          previouslyConnectedRef.current = false
          logout().catch((err) => console.error('Privy logout failed:', err))
          disconnect()
        }
        walletCheckTimeoutRef.current = null
      }, 2000)
    } else {
      previouslyConnectedRef.current = false
    }

    return cleanup
  }, [privyReady, privyAuthenticated, isConnected, logout, disconnect])

  return <>{children}</>
}
