interface PageBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title?: string
  description?: string
  hasHeader?: boolean
}

export default function PageBase({
  children,
  title,
  description,
  hasHeader,
}: PageBaseProps) {
  return (
    <section className="flex min-h-[calc(100vh-129px)] flex-col gap-8 py-4 lg:gap-12 lg:py-8">
      {hasHeader ? (
        <div className="grid px-4 lg:px-6">
          <h3 className="text-3xl font-semibold sm:text-5xl">{title}</h3>
          <p className="text-muted-foreground w-full text-base sm:max-w-[60%] sm:text-xl">
            {description}
          </p>
        </div>
      ) : null}
      {children}
    </section>
  )
}
