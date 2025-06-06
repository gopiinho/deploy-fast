'use client'
import { useEffect } from 'react'
import { api } from '../../../../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { useUserStore } from '@/state/userStore'
import { useContractInfoStore } from '@/state/contractStore'
import {
  ContractInfoHeader,
  ContractInfoHeaderPlaceholder,
} from '@/components/contracts/info/contract-info-header'
import ContractInfoOptions from '@/components/contracts/info/contract-info-options'
import ContractInfoWrapper from '@/components/contracts/info/contract-info-wrapper'
import { MoonLoader } from 'react-spinners'

interface ContractInfoLayoutProps {
  children: React.ReactNode
}

export default function ContractInfoLayout({
  children,
}: ContractInfoLayoutProps) {
  const params = useParams<{ slug: string; address: string }>()
  const slug = params?.slug
  const address = params?.address

  const { privyDid } = useUserStore()
  const { setContractData, setLoading, setError, resetContractData } =
    useContractInfoStore()

  const skipQuery = !privyDid || !slug || !address
  const contractData = useQuery(
    api.contracts.getContractBySlugAndAddress,
    skipQuery
      ? 'skip'
      : {
          privyDid: privyDid,
          projectSlug: slug!,
          contractAddress: address!,
        }
  )

  useEffect(() => {
    if (skipQuery) {
      resetContractData()
      return
    }

    if (contractData === undefined) {
      setLoading(true)
    } else if (contractData === null) {
      setError('Contract not found or you do not have access.')
    } else {
      setContractData(contractData)
    }
  }, [
    contractData,
    skipQuery,
    setLoading,
    setContractData,
    setError,
    resetContractData,
  ])

  useEffect(() => {
    return () => {
      resetContractData()
    }
  }, [slug, address, privyDid, resetContractData])

  if (contractData === undefined) {
    if (!slug || !address) {
      return <div>Loading Info...</div>
    }
    return (
      <div>
        {skipQuery ? (
          'Waiting for user data...'
        ) : (
          <ContractInfoLayoutPlaceholder />
        )}
      </div>
    )
  }

  if (contractData === null) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] w-full flex-col text-center">
        <span className="flex flex-col gap-1 py-20 text-2xl font-semibold">
          <span>Contract not found</span>
          <span>or</span>
          <span>You do not have access</span>
        </span>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col">
      <ContractInfoHeader
        name={contractData.name}
        address={contractData.address}
        type={contractData.type}
      />
      <div className="flex h-full flex-1">
        <ContractInfoOptions />
        <ContractInfoWrapper>{children}</ContractInfoWrapper>
      </div>
    </div>
  )
}

function ContractInfoLayoutPlaceholder() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col">
      <ContractInfoHeaderPlaceholder />
      <div className="flex h-full flex-1">
        <ContractInfoOptions />
        <div className="flex h-full w-full items-center justify-center py-16 text-center">
          <MoonLoader size={30} color="currentColor" />
        </div>
      </div>
    </div>
  )
}
