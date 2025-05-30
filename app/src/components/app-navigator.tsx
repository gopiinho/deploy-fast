'use client'
import Link from 'next/link'
import NavProfile from './nav-profile'
import { ProjectsTab } from './projects/projects-tab'
import { ChainSwitcher } from './chain-switcher'

export default function AppNavigator() {
  return (
    <header className="border-border my-auto flex h-16 w-full items-center justify-between border-b text-base sm:h-20">
      <div className="flex items-center gap-4">
        <Link href={'/projects'}>
          <div>
            <h2 className="text-xl font-semibold">
              DeployFast <span className="text-primary text-sm">Beta</span>
            </h2>
          </div>
        </Link>
        <span className="opacity-50">/</span>
        <ProjectsTab />
      </div>
      <div className="flex items-center gap-2">
        <ChainSwitcher showChainName={false} />
        <NavProfile />
      </div>
    </header>
  )
}
