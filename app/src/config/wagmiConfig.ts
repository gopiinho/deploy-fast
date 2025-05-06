import { mainnet, base, optimism, arbitrum, baseSepolia } from 'viem/chains'
import { http } from 'wagmi'

import { createConfig } from '@privy-io/wagmi'
import { chains, chainsTestnet } from '@/lib/chains'

export const wagmiConfig = createConfig({
  chains: [mainnet, base, optimism, arbitrum, baseSepolia],
  transports: {
    [mainnet.id]: http(chains.ethereum.rpcUrl),
    [base.id]: http(chains.base.rpcUrl),
    [optimism.id]: http(chains.optimism.rpcUrl),
    [arbitrum.id]: http(chains.arbitrum.rpcUrl),
    [baseSepolia.id]: http(chainsTestnet.baseSepolia.rpcUrl),
  },
})
