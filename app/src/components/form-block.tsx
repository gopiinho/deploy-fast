interface FormBlockProps {
  children: React.ReactNode
  title: string
}

export function FormBlock({ children, title }: FormBlockProps) {
  return (
    <div className="flex flex-col">
      <div className="py-4 text-xl font-semibold lg:text-2xl">{title}</div>
      <div className="py-4">{children}</div>
    </div>
  )
}
