import { create } from 'zustand'

type DeleteProjectType = {
  deletingProject: boolean
  deleteProjectOpen: boolean
  setIsDeleteProject: (deleteProjectOpen: boolean) => void
  setIsDeleteProjectOpen: (deleteProjectOpen: boolean) => void
}

export const useDeleteProjectStore = create<DeleteProjectType>((set) => ({
  deletingProject: false,
  deleteProjectOpen: false,
  setIsDeleteProject: (deleteProjectOpen) => set(() => ({ deleteProjectOpen })),
  setIsDeleteProjectOpen: (deleteProjectOpen) =>
    set(() => ({ deleteProjectOpen })),
}))
