import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'

interface ContractInfoOptionsItemsProps {
  title: string
  path: string
}

function ProjectOptionsItems({ title, path }: ContractInfoOptionsItemsProps) {
  const pathname = usePathname()
  const params = useParams<{ slug: string; address: string }>()

  const basePath = `/projects/${params.slug}/contracts/${params.address}`

  const isActive =
    path === '' ? pathname === basePath : pathname === `${basePath}/${path}`
  const href = path === '' ? basePath : `${basePath}/${path}`

  return (
    <Link href={href} className="block">
      <span
        className={`flex cursor-pointer items-center gap-3 rounded-sm px-2 py-1 duration-150 ${
          isActive
            ? 'bg-accent text-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
        }`}
      >
        {title}
      </span>
    </Link>
  )
}

export default function ContractInfoOptions() {
  return (
    <div className="text-muted-foreground border-border flex w-[18%] flex-col justify-between border-r px-4 py-4 max-lg:hidden">
      <div className="flex flex-col gap-1">
        <span className="text-foreground mb-1 px-2 font-semibold">General</span>
        <ProjectOptionsItems title="Overview" path="" />
        <ProjectOptionsItems title="Functions" path="functions" />
        <ProjectOptionsItems title="Settings" path="settings" />
        <span className="text-foreground mb-1 mt-4 px-2 font-semibold">
          Actions
        </span>
        <ProjectOptionsItems title="Tokens" path="tokens" />
        <ProjectOptionsItems title="Permissions" path="permissions" />
      </div>
    </div>
  )
}
