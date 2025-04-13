'use client'
import { FaPlus } from 'react-icons/fa6'
import ProjectHeader from '@/components/projects/project-header'
import ProjectContent from '@/components/projects/project-content'
import ProjectContractList from '@/components/projects/project-contract-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ContractsPage() {
  return (
    <div className="flex w-full flex-col">
      <ProjectHeader title="Contracts">
        <Link href={'/contracts'}>
          <Button size={'lg'}>
            <FaPlus />
            Deploy Contract
          </Button>
        </Link>
      </ProjectHeader>
      <ProjectContent>
        <ProjectContractList />
      </ProjectContent>
    </div>
  )
}
