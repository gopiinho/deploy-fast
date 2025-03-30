'use client'
import { usePrivy } from '@privy-io/react-auth'
import HomeNavigator from './home-navigator'
import AppNavigator from './app-navigator'

export default function Navigator() {
  const { ready, authenticated } = usePrivy()
  return (
    <section className="border-primary-foreground my-auto flex h-16 items-center justify-between border-b px-4 text-base sm:h-20 lg:px-6">
      {ready && authenticated ? <AppNavigator /> : <HomeNavigator />}
    </section>
  )
}
