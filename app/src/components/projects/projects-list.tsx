import Link from 'next/link'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ProjectsListProps {
  projects: Doc<'projects'>[] | null
  onDelete: (projectId: Id<'projects'>) => void
}

export default function ProjectsList({
  projects,
  onDelete,
}: ProjectsListProps) {
  return (
    <div className="grid">
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70%]">Project</TableHead>
              <TableHead className="w-[15%]">Created</TableHead>
              <TableHead className="w-[15%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project._id} className="relative cursor-pointer">
                <TableCell className="font-medium">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View project ${project.name}`}
                  >
                    <span className="sr-only">View project {project.name}</span>
                  </Link>
                  {project.name}
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
    </div>
  )
}
