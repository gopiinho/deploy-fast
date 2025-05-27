'use client'
import { useWallets, usePrivy } from '@privy-io/react-auth'
import { ChevronDown } from 'lucide-react'
import {
  mainnetChainsArray,
  testnetChainsArray,
  getChainByChainId,
} from '@/lib/chains'
import { useChainStore, useCurrentChainConfig } from '@/state/chainStore'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

interface ChainSwitcherProps {
  showChainName: boolean
}

export function ChainSwitcher({ showChainName }: ChainSwitcherProps) {
  const [open, setOpen] = useState(false)

  const { authenticated, ready: privyReady } = usePrivy()
  const { wallets, ready: walletsReady } = useWallets()

  const {
    setChainKeyById,
    setLoading: setStoreLoading,
    isLoading: isStoreLoading,
  } = useChainStore.getState()
  const storeCurrentChainConfig = useCurrentChainConfig()

  const handleChainSelect = async (targetChainId: number) => {
    setOpen(false)

    if (
      !privyReady ||
      !walletsReady ||
      !authenticated ||
      wallets.length === 0
    ) {
      alert('Please login and connect a wallet first.')
      return
    }

    const activePrivyWallet = wallets.find((wallet) => wallet) || wallets[0]

    if (!activePrivyWallet) {
      alert('No active Privy wallet found.')
      return
    }

    const currentPrivyWalletChainId = parseInt(
      activePrivyWallet.chainId.split(':')[1]
    )

    if (currentPrivyWalletChainId === targetChainId) {
      if (storeCurrentChainConfig.id !== targetChainId) {
        setChainKeyById(targetChainId)
      }
      return
    }

    setStoreLoading(true)
    try {
      const targetChainDetails = getChainByChainId(targetChainId)
      await activePrivyWallet.switchChain(targetChainId)
      setChainKeyById(targetChainId)
      console.log(
        `Privy wallet switch to ${targetChainDetails?.name || targetChainId} requested.`
      )
    } catch (error) {
      console.error('Failed to switch Privy wallet chain:', error)
      alert(`Failed to switch chain. Error: ${(error as Error).message}`)
    } finally {
      setStoreLoading(false)
    }
  }

  const displayChain = storeCurrentChainConfig

  if (!privyReady || !walletsReady) {
    return (
      <Button
        variant={'outline'}
        className="bg-muted-foreground max-w-48 animate-pulse rounded-2xl px-2 duration-1000"
      ></Button>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild className="max-w-48">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between gap-2"
          disabled={isStoreLoading}
        >
          <div className="flex items-center gap-2">
            {isStoreLoading ? (
              'Switching...'
            ) : (
              <>
                <Image
                  src={displayChain?.logo}
                  alt={displayChain?.name}
                  className="h-6 w-6 rounded-full"
                />
                {showChainName && displayChain?.name}
              </>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-56 p-0 lg:mr-6">
        <DropdownMenuGroup className="px-1 py-1">
          <DropdownMenuLabel>Select network</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Mainnets</DropdownMenuLabel>
          {mainnetChainsArray.map((chainOption) => (
            <DropdownMenuItem
              key={chainOption.id}
              onSelect={() => handleChainSelect(chainOption.id)}
              disabled={
                isStoreLoading ||
                displayChain?.id === chainOption.id ||
                chainOption.name !== 'baseSepolia'
              }
              className={`flex cursor-pointer items-center gap-2 p-2 ${
                displayChain?.id === chainOption.id ? 'bg-primary/30' : ''
              }`}
            >
              <Image
                src={chainOption.logo}
                alt={chainOption.name}
                className="h-6 w-6 rounded-full"
              />
              {chainOption.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        {testnetChainsArray.length > 0 && (
          <>
            <DropdownMenuGroup className="px-1 py-1">
              <DropdownMenuLabel>Testnets</DropdownMenuLabel>
              {testnetChainsArray.map((chainOption) => (
                <DropdownMenuItem
                  key={chainOption.id}
                  onSelect={() => handleChainSelect(chainOption.id)}
                  disabled={
                    isStoreLoading ||
                    displayChain?.id === chainOption.id ||
                    chainOption.name !== 'baseSepolia'
                  }
                  className={`flex cursor-pointer items-center gap-2 p-2 ${
                    displayChain?.id === chainOption.id ? 'bg-primary/30' : ''
                  }`}
                >
                  <Image
                    src={chainOption.logo}
                    alt={chainOption.name}
                    className="h-6 w-6 rounded-full"
                  />
                  {chainOption.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
