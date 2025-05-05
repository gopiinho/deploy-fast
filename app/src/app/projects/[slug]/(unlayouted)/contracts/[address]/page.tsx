'use client'
import React from 'react'
import { useUserStore } from '@/state/userStore'
import { api } from '../../../../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import ContractInfoHeader from '@/components/contracts/info/contract-info-header'

export default function ContractDetailPage() {
  const params = useParams<{ slug: string; address: string }>()

  const slug = params?.slug
  const address = params?.address

  const { privyDid } = useUserStore()

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
    <div className="min-h w-full">
      <h2>Contract Details</h2>
      <p>Name: {contractData.name || 'N/A'}</p>
      <p>Address: {contractData.address}</p>
      <p>Type: {contractData.type}</p>
    </div>
  )
}
