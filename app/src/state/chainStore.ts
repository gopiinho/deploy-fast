// store/useChainStore.ts
import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import {
  allChains,
  allChainsMap,
  defaultChain,
  getChainKeyByChainId,
  type SupportedChainKey,
  type SupportedChain,
  type ExtendedChain,
} from '@/lib/chains'

interface ChainState {
  currentChainKey: SupportedChainKey
  isLoading: boolean

  setChainKey: (chainKey: SupportedChainKey) => void
  setChainKeyById: (chainId: number) => void
  setLoading: (loading: boolean) => void

  getCurrentChainConfig: () => SupportedChain
  getAllChainsArray: () => readonly ExtendedChain[]
  getAllChainsMap: () => typeof allChainsMap
}

const initialChainKey = getChainKeyByChainId(defaultChain.id)

if (!initialChainKey) {
  const fallbackKey =
    (Object.keys(allChainsMap)[0] as SupportedChainKey) ||
    ((process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev'
      ? 'baseSepolia'
      : 'base') as SupportedChainKey)
  if (!allChainsMap[fallbackKey]) {
    throw new Error(
      'Fallback chain key is invalid. Check chain configurations.'
    )
  }
}

export const useChainStore = create<ChainState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        currentChainKey:
          initialChainKey ||
          ((process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev'
            ? 'baseSepolia'
            : 'base') as SupportedChainKey),
        isLoading: false,

        setChainKey: (chainKey) => {
          if (allChainsMap[chainKey]) {
            set({ currentChainKey: chainKey })
          } else {
            console.warn(`Attempted to set an invalid chainKey: ${chainKey}`)
          }
        },

        setChainKeyById: (chainId) => {
          const chainKey = getChainKeyByChainId(chainId)
          if (chainKey && allChainsMap[chainKey]) {
            set({ currentChainKey: chainKey })
          } else {
            console.warn(
              `Could not find a valid chainKey for chainId: ${chainId}`
            )
          }
        },

        setLoading: (loading) => set({ isLoading: loading }),

        getCurrentChainConfig: () => {
          const currentKey = get().currentChainKey

          const config = allChainsMap[currentKey]
          if (!config) {
            console.error(
              `Config not found for currentChainKey: ${currentKey}. Returning default chain config.`
            )
            return defaultChain
          }
          return config
        },

        getAllChainsArray: () => allChains,

        getAllChainsMap: () => allChainsMap,
      }),
      {
        name: 'chain-store',
        partialize: (state) => ({
          currentChainKey: state.currentChainKey,
        }),
      }
    )
  )
)

export const useCurrentChainKey = () =>
  useChainStore((state) => state.currentChainKey)

export const useCurrentChainConfig = () =>
  useChainStore((state) => state.getCurrentChainConfig())

export const useIsChainLoading = () => useChainStore((state) => state.isLoading)

export const useAllChainsArray = () =>
  useChainStore((state) => state.getAllChainsArray())

export const useAllChainsMap = () =>
  useChainStore((state) => state.getAllChainsMap())
