'use client'
import { useEffect, Suspense } from 'react'
import { api } from '../../../../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { useUserStore } from '@/state/userStore'
import { useContractInfoStore } from '@/state/contractStore'
import ContractInfoHeader from '@/components/contracts/info/contract-info-header'
import ContractInfoOptions from '@/components/contracts/info/contract-info-options'
import ContractInfoWrapper from '@/components/contracts/info/contract-info-wrapper'
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
        {skipQuery ? 'Waiting for user data...' : 'Loading contract data...'}
      </div>
    )
  }

  if (contractData === null) {
    return <div>Error: Contract not found or you do not have access.</div>
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] w-full flex-col">
      <Suspense fallback={<div>Loading...</div>}>
        <ContractInfoHeader
          name={contractData.name}
          address={contractData.address}
          type={contractData.type}
        />
      </Suspense>
      <div className="flex h-full flex-1">
        <ContractInfoOptions />
        <ContractInfoWrapper>{children}</ContractInfoWrapper>
      </div>
    </div>
  )
}
