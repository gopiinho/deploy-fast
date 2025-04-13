import Link from 'next/link'
import { HiOutlineCube } from 'react-icons/hi'
import { useUserStore } from '@/state/userStore'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableRowHeader,
} from '@/components/ui/table'

interface ProjectsListProps {
  projects: Doc<'projects'>[] | undefined
  onDelete: (projectId: Id<'projects'>) => void
}

export default function ProjectsList({
  projects,
  onDelete,
}: ProjectsListProps) {
  const { setActiveProject } = useUserStore()
  return (
    <div className="grid">
      <Table>
        <TableHeader className="overflow-hidden rounded-t-sm">
          <TableRowHeader>
            <TableHead className="w-[70%] py-2">Project</TableHead>
            <TableHead className="w-[15%] py-2">Created</TableHead>
            <TableHead className="w-[15%] py-2">Actions</TableHead>
          </TableRowHeader>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project._id} className="relative cursor-pointer">
              <TableCell className="font-medium">
                <Link
                  href={`/projects/${project.slug}`}
                  onClick={() => setActiveProject(project)}
                  className="absolute inset-0 z-10"
                  aria-label={`View project ${project.name}`}
                >
                  <span className="sr-only">View project {project.name}</span>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border p-1">
                    <HiOutlineCube size={14} />
                  </span>
                  {project.name}
                </div>
              </TableCell>
              <TableCell>
                {new Date(project._creationTime).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell className="text-right">
                <div className="relative z-20 flex gap-3">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(project._id)
                    }}
                    variant={'delete'}
                    size={'sm'}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
