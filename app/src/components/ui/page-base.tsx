interface PageBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title: string
  description: string
}

export default function PageBase({
  children,
  title,
  description,
}: PageBaseProps) {
  return (
    <section className="grid h-full gap-8 px-4 py-4 lg:gap-12 lg:px-6 lg:py-8">
      <div className="grid">
        <h3 className="text-3xl font-semibold sm:text-5xl">{title}</h3>
        <p className="text-muted-foreground w-full text-base sm:max-w-[60%] sm:text-xl">
          {description}
        </p>
      </div>
      {children}
    </section>
  )
}
