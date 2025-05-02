import { Id } from '../../../convex/_generated/dataModel'
import { MoonLoader } from 'react-spinners'
import OverlayCard from '../ui/overlay-card'
import { Button } from '../ui/button'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { toast } from 'sonner'
import { useUserStore } from '@/state/userStore'
import { useDeleteProjectStore } from '@/state/deleteProjectStore'

interface DeleteProjectProps {
  projectId: Id<'projects'>
  open: boolean
  deleting: boolean
  close: () => void
}

export default function DeleteProject({
  projectId,
  deleting,
  open,
  close,
}: DeleteProjectProps) {
  const { privyDid } = useUserStore()
  const { setIsDeleteProjectOpen } = useDeleteProjectStore()

  const deleteProject = useMutation(api.projects.deleteProject)

  async function handleDeleteProject(projectId: Id<'projects'>) {
    try {
      if (!privyDid) {
        toast.error('User not authenticated')
        return
      }
      await deleteProject({
        privyDid,
        projectId,
      })
      setIsDeleteProjectOpen(false)
      toast.success('Project deleted successfully!')
    } catch {
      toast.error('Failed to delete project')
    }
  }
  return (
    <OverlayCard title="Delete Project" open={open} close={close}>
      <div className="flex flex-col gap-4">
        <p>
          This project will be deleted, along with its Smart Contracts and
          Settings.
        </p>
        <div className="rounded-sm bg-red-600/30 p-2 text-sm text-red-400">
          <span className="font-semibold">Warning</span>: This action is not
          reversible. Please be certain.
        </div>
        <div className="flex items-end justify-end gap-2 pt-4">
          <Button type="button" onClick={close} variant={'outline'} size={'lg'}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteProject(projectId)}
            type="submit"
            variant={'delete'}
            size={'lg'}
          >
            {deleting ? <MoonLoader size={20} /> : 'Delete'}
          </Button>
        </div>
      </div>
    </OverlayCard>
  )
}
