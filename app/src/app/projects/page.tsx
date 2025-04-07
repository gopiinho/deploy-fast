'use client'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'
import { CiCirclePlus } from 'react-icons/ci'

import { Id } from '../../../convex/_generated/dataModel'
import { api } from '../../../convex/_generated/api'
import { useUserStore } from '@/state/userStore'
import PageBase from '@/components/ui/page-base'
import { Button } from '@/components/ui/button'
import ProjectsList from '@/components/projects/projects-list'
import { useCreateProjectStore } from '@/state/createProjectStore'
import CreateProject from '@/components/projects/create-project'

export default function Projects() {
  const { privyDid, projects, hasProjects } = useUserStore()
  const { open, setOpen } = useCreateProjectStore()

  const handleCreateProject = () => {
    setOpen(true)
  }

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
      toast.success('Project deleted successfully!')
    } catch {
      toast.error('Failed to delete project')
    }
  }

  return (
    <PageBase>
      {hasProjects ? (
        <div className="flex flex-col gap-8">
          <div className="border-primary-foreground flex border-b">
            <div className="px-4 pb-5 lg:px-6 lg:pb-8">
              <span className="text-2xl font-semibold sm:text-3xl">
                Overview
              </span>
            </div>
          </div>
          <div className="flex flex-col px-4 lg:px-6">
            <div className="bg-primary-foreground flex justify-between rounded-t-xl border p-4 sm:p-6">
              <h3 className="text-2xl font-semibold">Projects</h3>
              <Button
                size={'lg'}
                className="rounded-sm"
                onClick={handleCreateProject}
              >
                <CiCirclePlus /> Create Project
              </Button>
            </div>

            <ProjectsList projects={projects} onDelete={handleDeleteProject} />
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center gap-4 py-20 text-center">
          <p className="text-lg sm:text-xl">
            No projects found. Create your first project to get started.
          </p>
          <Button
            size={'lg'}
            className="rounded-sm"
            onClick={handleCreateProject}
          >
            <CiCirclePlus /> Create Project
          </Button>
          {open ? <CreateProject close={() => setOpen(false)} /> : null}
        </div>
      )}
    </PageBase>
  )
}
