import { toast } from 'sonner'
import { Doc } from '../../../convex/_generated/dataModel'

interface ValidateProjectNameProps {
  newProjectName: string
  activeProject: Doc<'projects'> | undefined
}

export const validateProjectName = ({
  newProjectName,
  activeProject,
}: ValidateProjectNameProps): boolean => {
  if (!newProjectName.trim()) {
    toast.error('Project name cannot be empty')
    return false
  }

  if (newProjectName.trim().length < 3) {
    toast.error('Project name must be at least 3 characters')
    return false
  }

  if (newProjectName.trim().length > 50) {
    toast.error('Project name cannot exceed 50 characters')
    return false
  }

  if (newProjectName.trim() === activeProject?.name) {
    toast.error('New name must be different from current name')
    return false
  }

  return true
}
