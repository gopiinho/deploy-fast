import { create } from 'zustand'

type ContractTokenData = {
  totalSupply: string | undefined
  userBalance: string | undefined
  setTotalSupply: (supply: string | undefined) => void
  setUserBalance: (balance: string | undefined) => void
}

export const useContractTokenStore = create<ContractTokenData>((set) => ({
  totalSupply: undefined,
  userBalance: undefined,
  setTotalSupply: (supply: string | undefined) => set({ totalSupply: supply }),
  setUserBalance: (balance: string | undefined) =>
    set({ userBalance: balance }),
}))
