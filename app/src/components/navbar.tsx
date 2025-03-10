'use client'
import { CiWallet } from 'react-icons/ci'
import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from './ui/button'

export default function Navigator() {
  const { ready, authenticated, login, logout } = usePrivy()

  const disableLogin = !ready || (ready && authenticated)
  const disableLogout = !ready || (ready && !authenticated)

  return (
    <section className="border-primary-foreground my-auto flex h-16 items-center justify-between border-b px-4 text-base sm:h-20 lg:px-6">
      <Link href={'/'}>
        <h2 className="text-xl font-semibold">DeployFast</h2>
      </Link>
      <div className="text-muted hidden gap-4 lg:flex">
        <Link
          className="hover:text-foreground rounded-2xl px-3 py-1 duration-150"
          href={'/contracts/'}
        >
          Contracts
        </Link>
      </div>
      <div className="flex gap-2">
        {ready && authenticated ? (
          <Button size="sm" disabled={disableLogout} onClick={logout}>
            Log out
          </Button>
        ) : (
          <Button size="sm" disabled={disableLogin} onClick={login}>
            <CiWallet /> Login
          </Button>
        )}
      </div>
    </section>
  )
}
