import type { PrivyClientConfig } from '@privy-io/react-auth'
import { chainsTestnet } from '@/lib/chains'
import { baseSepolia } from 'viem/chains'

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    showWalletUIs: true,
  },
  loginMethods: ['google', 'wallet'],
  appearance: {
    theme: 'dark',
    showWalletLoginFirst: true,
  },
  defaultChain: baseSepolia,
}
