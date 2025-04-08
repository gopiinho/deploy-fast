import Link from 'next/link'
import { useState } from 'react'
import { useUserStore } from '@/state/userStore'
import { IoIosArrowUp } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { CiCirclePlus } from 'react-icons/ci'
import { HiOutlineCube } from 'react-icons/hi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import CreateProject from './create-project'
import { useCreateProjectStore } from '@/state/createProjectStore'
import { Doc } from '../../../convex/_generated/dataModel'

type ProjectDoc = Doc<'projects'>

export function ProjectsTab() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { projects, activeProject, setActiveProject } = useUserStore()
  const { open, setOpen } = useCreateProjectStore()

  const handleCreateProject = () => {
    setOpen(true)
    setDropdownOpen(false)
  }

  const handleProjectSelect = (project: ProjectDoc) => {
    setActiveProject(project)
    setDropdownOpen(false)
  }

  return (
    <div className="flex min-w-20 items-center gap-1 max-sm:hidden">
      <span className="text-foreground font-semibold">
        {activeProject ? (
          <Link
            className="flex items-center gap-2 p-2"
            href={`/projects/${activeProject?.slug}`}
          >
            <span className="rounded-full border p-1">
              <HiOutlineCube size={14} />
            </span>
            {activeProject.name}
          </Link>
        ) : (
          'Loading...'
        )}
      </span>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <div className="hover:bg-primary-foreground flex cursor-pointer flex-col rounded-xl p-2 duration-150">
            <IoIosArrowUp size={10} /> <IoIosArrowDown size={10} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-muted-foreground m-1 w-56 p-1">
          <span className="px-2 text-sm">Projects</span>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="text-foreground">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <DropdownMenuItem
                  key={project._id}
                  onClick={() => handleProjectSelect(project)}
                  className={`cursor-pointer ${
                    project._id === activeProject?._id
                      ? 'bg-primary-foreground'
                      : ''
                  }`}
                >
                  <span className="rounded-full border p-1">
                    <HiOutlineCube size={14} />
                  </span>
                  {project.name}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No projects found</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Button
                size={'full'}
                className="rounded-sm"
                onClick={handleCreateProject}
              >
                <CiCirclePlus /> Create Project
              </Button>
            </DropdownMenuGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {open ? <CreateProject close={() => setOpen(false)} /> : null}
    </div>
  )
}
