interface ProjectWrapperProps {
  children: React.ReactNode
}

export default function ProjectWrapper({ children }: ProjectWrapperProps) {
  return <div className="flex min-h-[calc(100vh-80px)] w-full">{children}</div>
}
