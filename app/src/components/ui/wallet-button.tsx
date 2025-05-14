'use client'
import { useConnectWallet, useWallets } from '@privy-io/react-auth'
import { Button, buttonVariants } from './button'
import { type VariantProps } from 'class-variance-authority'
import React from 'react'

interface WalletButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  asChild?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function WalletButton({
  children,
  className,
  variant,
  size,
  asChild = false,
  onClick,
  ...props
}: WalletButtonProps) {
  const { connectWallet } = useConnectWallet()
  const { wallets } = useWallets()

  const isWalletConnected = wallets.length > 0

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isWalletConnected) {
      try {
        await connectWallet()
        return
      } catch (error) {
        console.error('Failed to connect wallet:', error)
        return
      }
    }

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Button
      onClick={handleClick}
      className={className}
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
    >
      {isWalletConnected ? children : 'Connect Wallet'}
    </Button>
  )
}
