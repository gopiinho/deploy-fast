import { FaStarOfLife } from 'react-icons/fa6'

interface FormTagProps {
  isRequired?: boolean
  title: string
  description?: string
}

export function FormTag({ isRequired, title, description }: FormTagProps) {
  return isRequired ? (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <span className="font-semibold">{title}</span>
        <span className="text-red-400">
          <FaStarOfLife size={7} />
        </span>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  ) : (
    <span className="font-semibold">{title}</span>
  )
}
