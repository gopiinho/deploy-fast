interface ProjectHeaderProps {
  title: string
  children?: React.ReactNode
}

export default function ProjectHeader({ title, children }: ProjectHeaderProps) {
  return (
    <div className="border-primary-foreground flex justify-between border-b px-3 py-6 sm:px-4 sm:py-8">
      <span className="text-2xl font-bold sm:text-3xl">{title}</span>
      {children ? children : null}
    </div>
  )
}
