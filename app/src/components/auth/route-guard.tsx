'use client'
import { useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const { ready, authenticated } = usePrivy()
  const router = useRouter()

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/login')
    }
  }, [ready, authenticated, router])

  if (!ready || !authenticated) {
    return null
  }

  return <>{children}</>
}
