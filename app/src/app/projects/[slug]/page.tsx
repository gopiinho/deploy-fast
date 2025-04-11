'use client'
import ProjectHeader from '@/components/projects/project-header'
import ProjectContent from '@/components/projects/project-content'
import { useUserStore } from '@/state/userStore'

export default function ProjectPage() {
  const { activeProject } = useUserStore()

  return (
    <div className="flex w-full flex-col">
      <ProjectHeader title={activeProject?.name || ''} />
      <ProjectContent>Project Details</ProjectContent>
    </div>
  )
}
