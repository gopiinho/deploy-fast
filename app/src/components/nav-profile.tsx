'use client'
import { useRouter } from 'next/navigation'
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
import { shortenAddress } from '@/lib/helpers/helpers'
import { useUserStore } from '@/state/userStore'
import { customerPortalLink } from '@/lib/constants'

export default function NavProfile() {
  const router = useRouter()

  const { user, logout } = usePrivy()
  const { theme, setTheme } = useTheme()
  const { user: appUser } = useUserStore()

  const userHasPro = appUser?.hasPro

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleSubscriptionClick = () => {
    if (userHasPro) {
      window.open(
        customerPortalLink + '?prefilled_email=' + appUser.email,
        '_blank'
      )
    } else {
      router.push('/billing')
    }
  }

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="hover:border-border group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-transparent bg-transparent p-[0.5px] duration-150">
          <div className="bg-radial-[at_25%_25%] from-background dark:from-foreground to-primary h-10 w-10 rounded-full border to-75% p-1"></div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-56 lg:mr-6">
        <div className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm border p-2 duration-150">
          {user.wallet?.address ? shortenAddress(user.wallet.address) : 'N/A'}
          <CiWallet />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleSubscriptionClick}
            className={`text-primary ${userHasPro && 'bg-primary/20'}`}
          >
            {userHasPro ? 'Manage Subscription' : 'Upgrade Plan'}
          </DropdownMenuItem>

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
