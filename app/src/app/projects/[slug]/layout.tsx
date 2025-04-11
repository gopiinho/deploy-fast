'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { MoonLoader } from 'react-spinners'
import { useUserStore } from '@/state/userStore'
import ProjectWrapper from '@/components/projects/project-wrapper'
import ProjectOptions from '@/components/projects/project-options'
import { Id } from '../../../../convex/_generated/dataModel'
import ProjectContentWrapper from '@/components/projects/project-content-wrapper'
import Footer from '@/components/footer'

interface Project {
  _id: Id<'projects'>
  name: string
  slug?: string
  userId: Id<'users'>
  _creationTime: number
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentProject, setCurrentProject] = useState<Project | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const { projects } = useUserStore()

  useEffect(() => {
    if (projects === undefined) {
      setIsLoading(true)
      return
    }

    const foundProject = projects?.find((p) => p.slug === slug)

    if (foundProject) {
      setCurrentProject(foundProject)
      setIsLoading(false)
    } else {
      setCurrentProject(undefined)
      setIsLoading(false)
      router.replace('/projects')
    }
  }, [slug, projects, router])

  return (
    <ProjectWrapper>
      <ProjectOptions projectName={slug} />
      <ProjectContentWrapper>
        {isLoading ? (
          <div className="text-foreground flex h-full w-full items-center justify-center">
            <MoonLoader size={30} color="var(--foreground)" />
          </div>
        ) : currentProject ? (
          children
        ) : (
          <div>Project not found</div>
        )}
        <Footer />
      </ProjectContentWrapper>
    </ProjectWrapper>
  )
}
