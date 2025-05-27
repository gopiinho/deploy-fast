import { createConfig } from '@privy-io/wagmi'
import { allChains, wagmiTransports } from '@/lib/chains'
import type { ExtendedChain } from '@/lib/chains'

const chainsForWagmi = allChains as readonly [ExtendedChain, ...ExtendedChain[]]

export const wagmiConfig = createConfig({
  chains: chainsForWagmi,
  ssr: true,
  transports: wagmiTransports,
})

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}
