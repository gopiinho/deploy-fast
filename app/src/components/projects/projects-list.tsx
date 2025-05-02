import Link from 'next/link'
import { HiOutlineCube } from 'react-icons/hi'
import { useUserStore } from '@/state/userStore'
import { Doc } from '../../../convex/_generated/dataModel'
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
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const { setActiveProject } = useUserStore()

  return (
    <div className="grid">
      <Table>
        <TableHeader>
          <TableRowHeader>
            <TableHead className="w-[70%]">Project</TableHead>
            <TableHead className="w-[15%]">Created</TableHead>
            <TableHead className="w-[15%]">Actions</TableHead>
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
                  <Button variant={'outline'} size={'sm'}>
                    View
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
