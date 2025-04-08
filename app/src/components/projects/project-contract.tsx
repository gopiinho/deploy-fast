import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { HiOutlineCube } from 'react-icons/hi'

import { Doc } from '../../../convex/_generated/dataModel'
import { useUserStore } from '@/state/userStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type ProjectDoc = Doc<'projects'>

export default function ProjectContract() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { activeProject, projects, setActiveProject } = useUserStore()

  const handleProjectSelect = (project: ProjectDoc) => {
    setActiveProject(project)
    setDropdownOpen(false)
  }
  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div className="hover:bg-primary-foreground flex max-w-48 cursor-pointer items-center justify-between rounded-sm border px-4 py-2 duration-150">
          <div className="flex gap-2">
            <span className="rounded-full border p-1">
              <HiOutlineCube size={14} />
            </span>
            {activeProject?.name}
          </div>
          <span>
            <IoIosArrowDown size={10} />
          </span>
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
