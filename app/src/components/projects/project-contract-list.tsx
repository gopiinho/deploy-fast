import { useMemo } from 'react'
import Link from 'next/link'
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
  const { activeProject } = useUserStore()

  const activeProjectId = activeProject?._id

  const queryArgs = useMemo(() => {
    return activeProjectId ? { projectId: activeProjectId } : 'skip'
  }, [activeProjectId])

  const contractProjects = useQuery(
    api.contracts.getProjectContracts,
    queryArgs
  )

  return (
    <Table>
      <TableHeaderStyled>
        <TableRowHeader>
          <TableHead className="w-[60%]">Project</TableHead>
          <TableHead className="w-[20%]">Address</TableHead>
          <TableHead className="w-[20%]">Created</TableHead>
        </TableRowHeader>
      </TableHeaderStyled>
      <TableBody>
        {contractProjects ? (
          <>
            {contractProjects?.map((contract) => (
              <TableRow key={contract._id} className="relative cursor-pointer">
                <TableCell className="font-medium">
                  <Link
                    href={`/projects/contracts/${contract.address}`}
                    className="absolute inset-0 z-10"
                  >
                    <span className="sr-only">
                      View project {contract.name}
                    </span>
                  </Link>
                  {contract.name}
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
