'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useReadContracts, useAccount } from 'wagmi'
import { Address, formatUnits } from 'viem'
import { erc20Abi } from '@/lib/abis/erc20Abi'
import TokenDetails from '@/components/contracts/info/token-details'
import { useContractTokenStore } from '@/state/contractTokenStore'

export default function ContractDetailPage() {
  const params = useParams<{ address: string }>()

  const { address } = useAccount()
  const contractAddress = params?.address as Address
  const { setTotalSupply, setUserBalance } = useContractTokenStore()

  const { data, isLoading, isError } = useReadContracts({
    contracts: [
      {
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'totalSupply',
      },
      {
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address as Address],
      },
    ],
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>

  const totalSupply = data?.[0].result
  const userBalance = data?.[1]?.result

  const formattedTotalSupply = totalSupply ? formatUnits(totalSupply, 18) : '0'
  const formattedUserBalance = userBalance ? formatUnits(userBalance, 18) : '0'

  useEffect(() => {
    if (formattedTotalSupply && formattedUserBalance) {
      setTotalSupply(formattedTotalSupply)
      setUserBalance(formattedUserBalance)
    }
  }, [formattedTotalSupply, formattedUserBalance, setTotalSupply, setUserBalance])

  return (
    <div>
      <TokenDetails
        totalTokens={formattedTotalSupply}
        userTokens={formattedUserBalance}
      />
    </div>
  )
}
