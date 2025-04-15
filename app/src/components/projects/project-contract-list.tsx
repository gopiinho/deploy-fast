import Link from 'next/link'
import { TbNotes } from 'react-icons/tb'
import { HiDotsVertical } from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'
import { useUserStore } from '@/state/userStore'
import { useQuery, useMutation } from 'convex/react'
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { shortenAddress } from '@/lib/helpers'
import { Id } from '../../../convex/_generated/dataModel'
import { toast } from 'sonner'
import { extractConvexError } from '@/lib/extractConvexError'

export default function ProjectContractList() {
  const { activeProject, convexUserId, privyDid } = useUserStore()

  const activeProjectId = activeProject?._id

  const contractProjects = useQuery(
    api.contracts.getProjectContracts,
    activeProjectId && convexUserId
      ? { projectId: activeProjectId, userId: convexUserId }
      : 'skip'
  )

  const deleteContract = useMutation(api.contracts.deleteContract)

  const handleDeleteContract = async (contractId: Id<'contracts'>) => {
    try {
      if (!privyDid) {
        return
      }
      const success = await deleteContract({ contractId, privyDid })

      if (success) {
        toast.success('Contract deleted successfully!')
      }
    } catch (error) {
      const errorMessage = extractConvexError(error)
      toast.error(errorMessage)
    }
  }

  return (
    <Table>
      <TableHeaderStyled>
        <TableRowHeader>
          <TableHead className="w-[30%]">Project</TableHead>
          <TableHead className="w-[20%]">Type</TableHead>
          <TableHead className="w-[20%]">Address</TableHead>
          <TableHead className="w-[20%]">Created</TableHead>
          <TableHead className="w-[10%]">Actions</TableHead>
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
                  <TableCell>
                    <div className="flex">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <span className="hover:bg-accent hover:text-primary relative z-20 cursor-pointer rounded-sm p-2 duration-150">
                            <HiDotsVertical />
                          </span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-6">
                          <DropdownMenuItem
                            className="flex items-center"
                            onClick={() => handleDeleteContract(contract._id)}
                          >
                            <RxCross2 className="text-red-500" /> Remove from
                            project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
              <TableCell
                colSpan={4}
                className="bg-accent/80 h-20 animate-pulse"
              />
            </TableRow>
            <TableRow className="items-center justify-center">
              <TableCell
                colSpan={4}
                className="bg-accent/80 h-20 animate-pulse"
              />
            </TableRow>
          </>
        )}
      </TableBody>
    </Table>
  )
}
