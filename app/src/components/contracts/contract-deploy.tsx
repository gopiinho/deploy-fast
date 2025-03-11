interface ContractDeployProps {
  children: React.ReactNode
  title: string
  description: string
}

export default function ContractDeploy({
  children,
  title,
  description,
}: Readonly<ContractDeployProps>) {
  return (
    <section className="mx-auto my-8 flex h-[100rem] flex-col gap-4 lg:my-12 lg:w-[70%]">
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold lg:text-3xl">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}
