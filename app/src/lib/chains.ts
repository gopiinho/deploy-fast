interface ChainProps {
  name: string
  chainId: number
  rpcUrl: string
  explorerUrl: string
}

const chains: Record<string, ChainProps> = {
  ethereum: {
    name: 'Ethereum',
    chainId: 1,
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL!,
    explorerUrl: 'https://etherscan.io',
  },
  base: {
    name: 'Base',
    chainId: 8453,
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL!,
    explorerUrl: 'https://basescan.org/',
  },
  optimism: {
    name: 'Optimism',
    chainId: 10,
    rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL!,
    explorerUrl: 'https://optimistic.etherscan.io/',
  },
  arbitrum: {
    name: 'Arbitrum One',
    chainId: 42161,
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL!,
    explorerUrl: 'https://arbiscan.io/',
  },
}

const chainsTestnet: Record<string, ChainProps> = {
  baseSepolia: {
    name: 'Base Sepolia Testnet',
    chainId: 84532,
    rpcUrl: process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL!,
    explorerUrl: 'https://sepolia.basescan.org/',
  },
}

export { chains, chainsTestnet }
