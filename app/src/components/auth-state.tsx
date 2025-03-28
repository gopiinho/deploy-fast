'use client'
import { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useAccount, useDisconnect } from 'wagmi'

export default function AuthState() {
  const [hasChecked, setHasChecked] = useState(false)

  const { authenticated, logout } = usePrivy()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    if (!hasChecked) {
      setHasChecked(true)
      return
    }
    const checkWalletConnection = async () => {
      if (authenticated && !isConnected) {
        logout()
        disconnect()
      }
    }
    checkWalletConnection()
  }, [authenticated, isConnected, hasChecked])

  return null
}
