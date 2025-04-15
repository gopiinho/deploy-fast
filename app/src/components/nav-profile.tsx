'use client'
import Link from 'next/link'
import { IoIosLogOut } from 'react-icons/io'
import { IoSunnyOutline } from 'react-icons/io5'
import { IoMoonOutline } from 'react-icons/io5'
import { CiWallet } from 'react-icons/ci'

import { usePrivy } from '@privy-io/react-auth'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { shortenAddress } from '@/lib/helpers'

export default function NavProfile() {
  const { user, logout } = usePrivy()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:border-border group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-transparent bg-transparent p-[0.5px] duration-150">
          <div className="bg-radial-[at_25%_25%] from-foreground to-accent h-10 w-10 rounded-full border to-75% p-1"></div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-56 lg:mr-6">
        <div className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm border p-2 duration-150">
          {user.wallet?.address ? shortenAddress(user.wallet.address) : 'N/A'}
          <CiWallet />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/projects'}>
            <DropdownMenuItem>Your Projects</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={toggleTheme}>
            Theme
            <DropdownMenuShortcut>
              <div className="border-border flex gap-2 rounded-sm border px-2 py-1">
                {theme === 'light' ? <IoMoonOutline /> : <IoSunnyOutline />}
              </div>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={logout}>
          Log out
          <DropdownMenuShortcut>
            <IoIosLogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null
}
