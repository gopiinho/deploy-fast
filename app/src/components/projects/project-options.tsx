import Link from 'next/link'
import { IconType } from 'react-icons/lib'
import { AiOutlineHome } from 'react-icons/ai'
import { TbNotes } from 'react-icons/tb'
import { usePathname } from 'next/navigation'

interface ProjectOptionsItemsProps {
  Icon: IconType
  title: string
  path: string
  projectName: string
}

function ProjectOptionsItems({
  Icon,
  title,
  path,
  projectName,
}: ProjectOptionsItemsProps) {
  const pathname = usePathname()

  const isActive =
    path === ''
      ? pathname === `/projects/${projectName}`
      : pathname === `/projects/${projectName}/${path}`

  const href =
    path === ''
      ? `/projects/${projectName}`
      : `/projects/${projectName}/${path}`

  return (
    <Link href={href} className="block">
      <span
        className={`flex cursor-pointer items-center gap-3 rounded-sm px-2 py-1 duration-150 ${
          isActive
            ? 'bg-primary-foreground text-foreground'
            : 'text-muted-foreground hover:bg-primary-foreground hover:text-foreground'
        }`}
      >
        {<Icon size={17} />}
        {title}
      </span>
    </Link>
  )
}

export default function ProjectOptions({
  projectName,
}: {
  projectName: string | undefined
}) {
  return (
    <div className="text-muted-foreground border-primary-foreground flex w-[20%] flex-col justify-between border-r px-2 py-4 max-lg:hidden">
      <div className="flex flex-col gap-1">
        <ProjectOptionsItems
          Icon={AiOutlineHome}
          title="Overview"
          path=""
          projectName={projectName || ''}
        />
        <ProjectOptionsItems
          Icon={TbNotes}
          title="Contracts"
          path="contracts"
          projectName={projectName || ''}
        />
      </div>
    </div>
  )
}
