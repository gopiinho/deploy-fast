'use client'
import Link from 'next/link'
import NavProfile from './nav-profile'

export default function AppNavigator() {
  return (
    <section className="border-primary-foreground my-auto flex h-16 w-full items-center justify-between border-b px-4 text-base sm:h-20 lg:px-6">
      <Link href={'/'}>
        <h2 className="text-xl font-semibold">DeployFast</h2>
      </Link>
      <div className="flex gap-2">
        <NavProfile />
      </div>
    </section>
  )
}
