'use client'
import { usePrivy } from '@privy-io/react-auth'
import HomeNavigator from './home-navigator'
import AppNavigator from './app-navigator'
import Link from 'next/link'

function NavigatorPlaceholder() {
  return (
    <header className="border-border my-auto flex h-16 w-full items-center justify-between border-b text-base sm:h-20">
      <div className="flex items-center gap-4">
        <Link href={'/'}>
          <div>
            <h2 className="text-xl font-semibold">
              DeployFast <span className="text-primary text-sm">Beta</span>
            </h2>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default function Navigator() {
  const { ready, authenticated } = usePrivy()
  return (
    <header className="border-border my-auto flex h-16 items-center justify-between border-b px-4 text-base sm:h-20 lg:px-6">
      {!ready ? (
        <NavigatorPlaceholder />
      ) : authenticated ? (
        <AppNavigator />
      ) : (
        <HomeNavigator />
      )}
    </header>
  )
}
