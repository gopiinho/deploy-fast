import { useState } from 'react'
import { useUserStore } from '@/state/userStore'
import { IoIosArrowUp } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { CiCirclePlus } from 'react-icons/ci'
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

export function ProjectsTab() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { projects } = useUserStore()
  const { open, setOpen } = useCreateProjectStore()

  const handleCreateProject = () => {
    setOpen(true)
    setDropdownOpen(false)
  }

  return (
    <div className="flex min-w-20 items-center gap-3">
      <span>Project</span>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <div className="hover:bg-primary-foreground flex cursor-pointer flex-col rounded-xl p-1 duration-150">
            <IoIosArrowUp size={10} /> <IoIosArrowDown size={10} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-muted-foreground m-1 w-56 p-1">
          <span className="px-2 text-sm">Projects</span>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="text-foreground">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <DropdownMenuItem key={project._id}>
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
