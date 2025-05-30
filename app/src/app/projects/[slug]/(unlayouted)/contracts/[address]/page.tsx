'use client'
import { useParams } from 'next/navigation'
import { Address } from 'viem'
import TokenDetails from '@/components/contracts/info/token-details'
import { useTokenData } from '@/hooks/useTokenData'
import { MoonLoader } from 'react-spinners'

export default function ContractDetailPage() {
  const params = useParams<{ address: string }>()
  const contractAddress = params?.address as Address

  const { formattedTotalSupply, formattedUserBalance, isLoading, isError } =
    useTokenData(contractAddress)

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center py-12 text-center">
        <MoonLoader size={30} color="currentColor" />
      </div>
    )
  if (isError) return <div>Error fetching data</div>

  return (
    <div>
      <TokenDetails
        totalTokens={formattedTotalSupply}
        userTokens={formattedUserBalance}
      />
    </div>
  )
}
