'use client'
import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from './ui/button'

export default function Navigator() {
  const { ready, authenticated, login, logout } = usePrivy()

  const disableLogin = !ready || (ready && authenticated)
  const disableLogout = !ready || (ready && !authenticated)

  return (
    <section className="my-auto flex h-16 items-center justify-between px-10 text-sm">
      <Link href={'/'}>
        <h2 className="text-xl font-semibold">DeployFast</h2>
      </Link>
      <div className="flex gap-2">
        {ready && authenticated ? (
          <Button size="sm" disabled={disableLogout} onClick={logout}>
            Log out
          </Button>
        ) : (
          <Button size="sm" disabled={disableLogin} onClick={login}>
            Login
          </Button>
        )}
      </div>
    </section>
  )
}
