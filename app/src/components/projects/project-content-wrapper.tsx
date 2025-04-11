interface ProjectContentProps {
  children: React.ReactNode
}

export default function ProjectContentWrapper({
  children,
}: ProjectContentProps) {
  return (
    <div className="flex w-full flex-1 flex-col justify-between">
      {children}
    </div>
  )
}
