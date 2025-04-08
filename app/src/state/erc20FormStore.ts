import { create } from 'zustand'
import { DeployStatusType } from '@/lib/types'

type Erc20FormType = {
  name: string
  symbol: string
  description?: string
  mintAmount: number
  recipient: string
  confirming: boolean
  loading: boolean
  deployStatus: DeployStatusType
  setName: (name: string) => void
  setSymbol: (symbol: string) => void
  setDescription: (description: string) => void
  setMintAmount: (mintAmount: number) => void
  setRecipient: (recipient: string) => void
  setConfirming: (confirming: boolean) => void
  setLoading: (loading: boolean) => void
  setDeployStatus: (status: DeployStatusType) => void
}

export const useErc20FormStore = create<Erc20FormType>((set) => ({
  name: '',
  symbol: '',
  description: '',
  mintAmount: 0,
  recipient: '',
  confirming: false,
  loading: false,
  deployStatus: DeployStatusType.Idle,
  setName: (name) => set(() => ({ name })),
  setSymbol: (symbol) => set(() => ({ symbol })),
  setDescription: (description) => set(() => ({ description })),
  setMintAmount: (mintAmount) => set(() => ({ mintAmount })),
  setRecipient: (recipient) => set(() => ({ recipient })),
  setConfirming: (confirming) => set(() => ({ confirming })),
  setLoading: (loading) => set(() => ({ loading })),
  setDeployStatus: (deployStatus) => set(() => ({ deployStatus })),
}))
