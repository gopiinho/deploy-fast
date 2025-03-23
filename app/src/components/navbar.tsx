'use client'
import { CiWallet } from 'react-icons/ci'
import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from './ui/button'
import NavProfile from './nav-profile'

export default function Navigator() {
  const { ready, authenticated, login } = usePrivy()

  const disableLogin = !ready || (ready && authenticated)

  return (
    <section className="border-primary-foreground my-auto flex h-16 items-center justify-between border-b px-4 text-base sm:h-20 lg:px-6">
      {ready && authenticated ? (
        <Link href={'/contracts'}>
          <h2 className="text-xl font-semibold">DeployFast</h2>
        </Link>
      ) : (
        <Link href={'/'}>
          <h2 className="text-xl font-semibold">DeployFast</h2>
        </Link>
      )}
      <div className="flex gap-2">
        {ready && authenticated ? (
          <NavProfile />
        ) : (
          <Button size="sm" disabled={disableLogin} onClick={login}>
            <CiWallet /> Login
          </Button>
        )}
      </div>
    </section>
  )
}
