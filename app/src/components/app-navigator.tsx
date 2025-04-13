'use client'
import Link from 'next/link'
import NavProfile from './nav-profile'
import { ProjectsTab } from './projects/projects-tab'

export default function AppNavigator() {
  return (
    <header className="border-primary-foreground my-auto flex h-16 w-full items-center justify-between border-b text-base sm:h-20">
      <div className="flex items-center gap-4">
        <Link href={'/'}>
          <h2 className="text-xl font-semibold">DeployFast</h2>
        </Link>
        <span className="opacity-50">/</span>
        <ProjectsTab />
      </div>
      <div className="flex gap-2">
        <NavProfile />
      </div>
    </header>
  )
}
