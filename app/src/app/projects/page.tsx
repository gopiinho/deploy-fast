'use client'
import Link from 'next/link'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'

import { Id } from '../../../convex/_generated/dataModel'
import { api } from '../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/state/userStore'
import PageBase from '@/components/ui/page-base'

export default function Projects() {
  const { privyDid, projects, hasProjects } = useUserStore()

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
    <PageBase title="Projects">
      {hasProjects ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <div key={project._id} className="rounded-lg border p-4 shadow-sm">
              <h3 className="text-lg font-medium">{project.name}</h3>

              <div className="mt-4 flex justify-end gap-3">
                <Button
                  onClick={() => handleDeleteProject(project._id)}
                  variant={'delete'}
                  size={'sm'}
                >
                  Delete
                </Button>
                <Link href={`/projects/${project.slug}`}>
                  <Button variant={'outline'} size={'sm'}>
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p>No projects found. Create your first project to get started.</p>
        </div>
      )}
    </PageBase>
  )
}
