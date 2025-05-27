import { StaticImageData } from 'next/image'
import {
  mainnet,
  base,
  optimism,
  arbitrum,
  baseSepolia,
  sepolia,
} from 'viem/chains'
import type { Chain } from 'viem'
import { http } from 'wagmi'

import { ethLogo, baseLogo, optLogo, arbLogo } from '../../public/chains'

export interface ExtendedChain extends Chain {
  rpcUrl: string
  logo: StaticImageData
}

const mainnetRpcUrls = {
  ethereum:
    process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || 'https://rpc.ankr.com/eth',
  base: process.env.NEXT_PUBLIC_BASE_RPC_URL || 'https://mainnet.base.org',
  optimism:
    process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL || 'https://mainnet.optimism.io',
  arbitrum:
    process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || 'https://arb1.arbitrum.io/rpc',
}

const testnetRpcUrls = {
  baseSepolia:
    process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org',
  sepolia: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || 'https://rpc.sepolia.org',
}

const mainnetChains: Record<string, ExtendedChain> = {
  ethereum: {
    ...mainnet,
    rpcUrl: mainnetRpcUrls.ethereum,
    logo: ethLogo,
  },
  base: {
    ...base,
    rpcUrl: mainnetRpcUrls.base,
    logo: baseLogo,
  },
  optimism: {
    ...optimism,
    rpcUrl: mainnetRpcUrls.optimism,
    logo: optLogo,
  },
  arbitrum: {
    ...arbitrum,
    rpcUrl: mainnetRpcUrls.arbitrum,
    logo: arbLogo,
  },
}

const testnetChains: Record<string, ExtendedChain> = {
  baseSepolia: {
    ...baseSepolia,
    rpcUrl: testnetRpcUrls.baseSepolia,
    logo: baseLogo,
  },
}

const isDevelopment = process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev'

export const mainnetChainsMap: Record<string, ExtendedChain> = {
  ...mainnetChains,
}

export const testnetChainsMap: Record<string, ExtendedChain> = {
  ...testnetChains,
} as const

export const allChainsMap: Record<string, ExtendedChain> = {
  ...mainnetChains,
  ...(isDevelopment ? testnetChains : {}),
} as const

export const mainnetChainsArray: readonly ExtendedChain[] =
  Object.values(mainnetChainsMap)
export const testnetChainsArray: readonly ExtendedChain[] =
  Object.values(testnetChainsMap)
export const allChains: readonly ExtendedChain[] = Object.values(allChainsMap)

export const defaultChain: ExtendedChain = isDevelopment
  ? allChainsMap.baseSepolia || allChainsMap.sepolia || allChainsMap.baseSepolia
  : allChainsMap.base || allChainsMap.ethereum

if (!defaultChain) {
  throw new Error(
    'Default chain is not defined. Check your NEXT_PUBLIC_ENVIRONMENT and chain configurations.'
  )
}

export const wagmiTransports = allChains.reduce(
  (acc, chain) => {
    if (chain.rpcUrl && chain.rpcUrl.startsWith('http')) {
      acc[chain.id] = http(chain.rpcUrl)
    } else {
      console.warn(
        `Invalid or missing RPC URL for ${chain.name}. Wagmi will attempt to use a public RPC.`
      )
      acc[chain.id] = http()
    }
    return acc
  },
  {} as Record<number, ReturnType<typeof http>>
)
export type SupportedChainKey = keyof typeof allChainsMap
export type SupportedChain = (typeof allChainsMap)[SupportedChainKey]

export const getChainByChainId = (
  chainId: number
): ExtendedChain | undefined => {
  return allChains.find((chain) => chain.id === chainId)
}

export const getChainKeyByChainId = (
  chainId: number
): SupportedChainKey | undefined => {
  return Object.entries(allChainsMap).find(
    ([, chain]) => chain.id === chainId
  )?.[0] as SupportedChainKey
}
