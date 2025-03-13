import { create } from 'zustand'

type Erc20FormType = {
  name: string
  symbol: string
  description?: string
  mintAmount: number | undefined
  recipient: string
  setName: (name: string) => void
  setSymbol: (symbol: string) => void
  setDescription: (description: string) => void
  setMintAmount: (mintAmount: number) => void
  setRecipient: (recipient: string) => void
}

const useErc20FormStore = create<Erc20FormType>((set) => ({
  name: '',
  symbol: '',
  description: '',
  mintAmount: undefined,
  recipient: '',
  setName: (name) => set(() => ({ name })),
  setSymbol: (symbol) => set(() => ({ symbol })),
  setDescription: (description) => set(() => ({ description })),
  setMintAmount: (mintAmount) => set(() => ({ mintAmount })),
  setRecipient: (recipient) => set(() => ({ recipient })),
}))

export default useErc20FormStore
