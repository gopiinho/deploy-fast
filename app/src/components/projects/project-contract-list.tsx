import Link from 'next/link'
import { TbNotes } from 'react-icons/tb'
import { useUserStore } from '@/state/userStore'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderStyled,
  TableRow,
  TableRowHeader,
} from '@/components/ui/table'
import { shortenAddress } from '@/lib/helpers'

export default function ProjectContractList() {
  const { activeProject, convexUserId } = useUserStore()

  const activeProjectId = activeProject?._id

  const contractProjects = useQuery(
    api.contracts.getProjectContracts,
    activeProjectId && convexUserId
      ? { projectId: activeProjectId, userId: convexUserId }
      : 'skip'
  )

  return (
    <Table>
      <TableHeaderStyled>
        <TableRowHeader>
          <TableHead className="w-[40%]">Project</TableHead>
          <TableHead className="w-[20%]">Type</TableHead>
          <TableHead className="w-[20%]">Address</TableHead>
          <TableHead className="w-[20%]">Created</TableHead>
        </TableRowHeader>
      </TableHeaderStyled>
      <TableBody>
        {contractProjects ? (
          contractProjects.length > 0 ? (
            <>
              {contractProjects.map((contract) => (
                <TableRow
                  key={contract._id}
                  className="relative cursor-pointer"
                >
                  <TableCell className="font-medium">
                    <Link
                      href={`/projects/contracts/${contract.address}`}
                      className="absolute inset-0 z-10"
                    >
                      <span className="sr-only">
                        View project {contract.name}
                      </span>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border p-1">
                        <TbNotes size={14} />
                      </span>
                      {contract.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-xl border px-3 py-1 font-semibold">
                      {contract.type}
                    </span>
                  </TableCell>
                  <TableCell>{shortenAddress(contract.address)}</TableCell>
                  <TableCell>
                    {new Date(contract._creationTime).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="py-10 text-center">
                No Contracts
              </TableCell>
            </TableRow>
          )
        ) : (
          <>
            <TableRow className="items-center justify-center">
              <TableCell className="bg-primary-foreground h-20 animate-pulse" />
              <TableCell className="bg-primary-foreground h-20 animate-pulse" />
              <TableCell className="bg-primary-foreground h-20 animate-pulse" />
            </TableRow>
            <TableRow className="items-center justify-center">
              <TableCell className="bg-primary-foreground h-20 animate-pulse" />
              <TableCell className="bg-primary-foreground h-20 animate-pulse" />
              <TableCell className="bg-primary-foreground h-20 animate-pulse" />
            </TableRow>
          </>
        )}
      </TableBody>
    </Table>
  )
}
