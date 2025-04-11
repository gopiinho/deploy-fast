'use client'
import ProjectHeader from '@/components/projects/project-header'
import ProjectContent from '@/components/projects/project-content'

export default function ContractsPage() {
  return (
    <div className="flex w-full flex-col">
      <ProjectHeader title="Contracts" />
      <ProjectContent>Project Contracts</ProjectContent>
    </div>
  )
}
