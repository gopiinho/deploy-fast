'use client'
import { useState, ChangeEvent } from 'react'
import ProjectHeader from '@/components/projects/project-header'
import ProjectContent from '@/components/projects/project-content'
import { useUserStore } from '@/state/userStore'
import { useDeleteProjectStore } from '@/state/deleteProjectStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DeleteProject from '@/components/projects/delete-project'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
import { validateProjectName } from '@/lib/helpers/projectHelpers'

export default function ProjectPage() {
  const [newProjectName, setNewProjectName] = useState<string>('')
  const { activeProject, privyDid } = useUserStore()
  const { deletingProject, deleteProjectOpen, setIsDeleteProjectOpen } =
    useDeleteProjectStore()

  const renameProject = useMutation(api.projects.renameProject)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProjectName(e.target.value)
  }

  const handleRenameProject = async () => {
    try {
      if (!privyDid) {
        toast.error('User not authenticated')
        return
      }
      if (!activeProject?._id) {
        toast.error('Project not found')
        return
      }
      if (!validateProjectName({ newProjectName, activeProject })) {
        return
      }
      await renameProject({
        projectId: activeProject._id,
        privyDid: privyDid,
        name: newProjectName,
      })
      toast.success('Project renamed successfully')
    } catch {
      toast.error('Failed to rename project')
    }
  }

  return (
    <div className="flex w-full flex-col">
      <ProjectHeader title={activeProject?.name || ''} />
      <ProjectContent>
        <div className="flex flex-col gap-5">
          <div className="border-border flex flex-col rounded-sm border">
            <div className="border-border border-b">
              <div className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold">Project Name</h3>
                  <p className="text-sm">
                    Used to identify your project on Dashboard.
                  </p>
                </div>
                <div className="flex gap-2 lg:w-[40%]">
                  <Input
                    value={newProjectName}
                    onChange={handleInputChange}
                    className="bg-background"
                    placeholder="Enter project name"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="text-muted-foreground bg-card flex items-center justify-between p-4">
              <p>Please use 50 characters at maximum</p>
              <Button onClick={handleRenameProject}>Save</Button>
            </div>
          </div>
          <div className="border-destructive flex flex-col overflow-hidden rounded-sm border">
            <div className="border-destructive border-b">
              <div className="flex flex-col gap-3 p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold">Delete Project</h3>
                  <p className="text-sm">
                    The project will be permanently deleted, including its smart
                    contracts. This action is irreversible and can not be
                    undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-muted-foreground bg-desctructive flex justify-end p-4">
              <Button
                onClick={() => setIsDeleteProjectOpen(true)}
                variant={'delete'}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </ProjectContent>
      {deleteProjectOpen && activeProject && (
        <DeleteProject
          projectId={activeProject._id}
          deleting={deletingProject}
          open={deleteProjectOpen}
          close={() => setIsDeleteProjectOpen(false)}
        />
      )}
    </div>
  )
}
