'use client'
import { useParams } from 'next/navigation'
import ProjectHeader from '@/components/projects/project-header'
import ProjectContent from '@/components/projects/project-content'

export default function ContractsPage() {
  const params = useParams()
  const slug = params.slug as string

  return (
    <div className="flex w-full flex-col">
      <ProjectHeader title="Contracts" />
      <ProjectContent>Project Contracts</ProjectContent>
    </div>
  )
}
