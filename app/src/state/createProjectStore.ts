import { create } from 'zustand'

type CreateProjectType = {
  name: string
  open: boolean
  loading: boolean
  setName: (name: string) => void
  setOpen: (confirming: boolean) => void
  setLoading: (loading: boolean) => void
}

export const useCreateProjectStore = create<CreateProjectType>((set) => ({
  name: '',
  open: false,
  loading: false,
  setName: (name) => set(() => ({ name })),
  setOpen: (open) => set(() => ({ open })),
  setLoading: (loading) => set(() => ({ loading })),
}))
