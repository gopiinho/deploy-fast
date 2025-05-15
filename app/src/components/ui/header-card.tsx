interface HeaderCardProps {
  title: string
  children: React.ReactNode
}

export default function HeaderCard({ title, children }: HeaderCardProps) {
  return (
    <div className="bg-card grid w-full rounded-sm border">
      <div className="border-border border-b px-4 py-5 text-xl font-semibold">
        {title}
      </div>
      {children}
    </div>
  )
}
