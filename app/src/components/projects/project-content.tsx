interface ProjectContentProps {
  children: React.ReactNode
}

export default function ProjectContent({ children }: ProjectContentProps) {
  return <div className="w-full flex-1 px-3 py-4 sm:px-4">{children}</div>
}
