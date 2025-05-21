'use client'
import { FaPlus } from 'react-icons/fa6'
import { useUserStore } from '@/state/userStore'
import PageBase from '@/components/ui/page-base'
import { Button } from '@/components/ui/button'
import ProjectsList from '@/components/projects/projects-list'
import { useCreateProjectStore } from '@/state/createProjectStore'
import CreateProject from '@/components/projects/create-project'
import Footer from '@/components/footer'
import { MoonLoader } from 'react-spinners'

export default function Projects() {
  const { projects, hasProjects, isLoading } = useUserStore()
  const { open, setOpen } = useCreateProjectStore()

  const handleCreateProject = () => {
    setOpen(true)
  }

  return (
    <>
      <PageBase>
        {isLoading ? (
          <div className="text-foreground mb-12 flex min-h-[calc(100vh-80px)] items-center justify-center">
            <MoonLoader size={30} color="currentColor" />
          </div>
        ) : hasProjects ? (
          <div className="flex flex-col gap-8">
            <div className="border-border flex border-b">
              <div className="px-4 pb-5 lg:px-6 lg:pb-8">
                <span className="text-2xl font-semibold sm:text-3xl">
                  Overview
                </span>
              </div>
            </div>
            <div className="flex flex-col px-4 lg:px-6">
              <div className="bg-card flex justify-between rounded-t-xl border p-4 sm:p-6">
                <h3 className="text-2xl font-semibold">Projects</h3>
                <Button size={'lg'} onClick={handleCreateProject}>
                  <FaPlus /> Create Project
                </Button>
              </div>
              <ProjectsList projects={projects} />
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
              <FaPlus /> Create Project
            </Button>
            {open ? <CreateProject close={() => setOpen(false)} /> : null}
          </div>
        )}
      </PageBase>
      <Footer />
    </>
  )
}
