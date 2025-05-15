'use client'
import { CiWallet } from 'react-icons/ci'
import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import { useTheme } from 'next-themes'
import { IoSunnyOutline } from 'react-icons/io5'
import { IoMoonOutline } from 'react-icons/io5'
import { Button } from './ui/button'

export default function HomeNavigator() {
  const { ready, authenticated, login } = usePrivy()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const disableLogin = !ready || (ready && authenticated)

  return (
    <header className="border-border my-auto flex h-16 w-full items-center justify-between border-b text-base sm:h-20">
      <Link href={'/'}>
        <div>
          <h2 className="text-xl font-semibold">
            DeployFast <span className="text-primary text-sm">Beta</span>
          </h2>
        </div>
      </Link>
      <div className="flex gap-8 font-semibold max-sm:hidden">
        <Link
          href={'/#features'}
          className="text-muted-foreground hover:text-foreground transition duration-150"
        >
          Features
        </Link>
        <Link
          href={'/#pricing'}
          className="text-muted-foreground hover:text-foreground transition duration-150"
        >
          Pricing
        </Link>
        <Link
          href={'/contracts'}
          className="text-muted-foreground hover:text-foreground transition duration-150"
        >
          Contracts
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-2">
          <Button size="sm" disabled={disableLogin} onClick={login}>
            <CiWallet /> Login
          </Button>
          <button
            onClick={toggleTheme}
            className="text-foreground hover:bg-muted-foreground/30 border-muted-foreground flex cursor-pointer items-center justify-center gap-2 rounded-full border px-2 py-1 duration-150"
          >
            {theme === 'light' ? <IoMoonOutline /> : <IoSunnyOutline />}
          </button>
        </div>
      </div>
    </header>
  )
}
