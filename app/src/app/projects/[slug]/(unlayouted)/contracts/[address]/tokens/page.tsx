'use client'
import { useParams } from 'next/navigation'
import { Address } from 'viem'
import TokenDetails from '@/components/contracts/info/token-details'
import { useTokenData } from '@/hooks/useTokenData'
import MintTokens from '@/components/contracts/info/mint-tokens'
import BurnTokens from '@/components/contracts/info/burn-tokens'
import TransferTokens from '@/components/contracts/info/transfer-tokens'
import { MoonLoader } from 'react-spinners'

export default function ContractInfoTokens() {
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
    <div className="grid gap-6">
      <div className="max-sm:grid-cols- flex justify-between gap-4 max-sm:grid">
        <div className="text-2xl font-semibold">Tokens</div>
        <div className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
          <MintTokens />
          <BurnTokens />
          <TransferTokens />
        </div>
      </div>
      <TokenDetails
        totalTokens={formattedTotalSupply}
        userTokens={formattedUserBalance}
      />
    </div>
  )
}
