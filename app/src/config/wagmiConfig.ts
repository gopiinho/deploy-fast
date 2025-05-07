import { baseSepolia, mainnet, base, optimism, arbitrum } from 'viem/chains'
import { http } from 'wagmi'

import { createConfig } from '@privy-io/wagmi'
import { chains, chainsTestnet } from '@/lib/chains'

export const wagmiConfig = createConfig({
  chains: [baseSepolia, mainnet, base, optimism, arbitrum],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(chainsTestnet.baseSepolia.rpcUrl),
    [mainnet.id]: http(chains.ethereum.rpcUrl),
    [base.id]: http(chains.base.rpcUrl),
    [optimism.id]: http(chains.optimism.rpcUrl),
    [arbitrum.id]: http(chains.arbitrum.rpcUrl),
  },
})
