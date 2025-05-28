import type { PrivyClientConfig } from '@privy-io/react-auth'
import { allChains, defaultChain } from '@/lib/chains'

const chains = Object.values(allChains).map(({ ...chain }) => chain)

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: true,
    showWalletUIs: true,
  },
  loginMethods: ['google', 'wallet'],
  appearance: {
    theme: 'dark',
    showWalletLoginFirst: false,
  },
  supportedChains: chains,
  defaultChain: defaultChain,
}
