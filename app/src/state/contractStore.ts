import { create } from 'zustand'
import { Id } from '../../convex/_generated/dataModel'

type ContractData = {
  _id: Id<'contracts'>
  _creationTime: number
  name?: string
  address: string
  type: string
  projectId: Id<'projects'>
}

interface ContractStore {
  contractData: ContractData | null
  isLoading: boolean
  error: string | null
  setContractData: (data: ContractData) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  resetContractData: () => void
}

export const useContractInfoStore = create<ContractStore>((set) => ({
  contractData: null,
  isLoading: false,
  error: null,
  setContractData: (data) =>
    set({ contractData: data, isLoading: false, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (errorMsg) =>
    set({ error: errorMsg, isLoading: false, contractData: null }),
  resetContractData: () => set({ contractData: null }),
}))
