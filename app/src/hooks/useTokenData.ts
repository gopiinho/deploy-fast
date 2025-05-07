import { useReadContracts, useAccount } from 'wagmi'
import { Address, formatUnits } from 'viem'
import { erc20Abi } from '@/lib/abis/erc20Abi'
import { useContractTokenStore } from '@/state/contractTokenStore'
import { useEffect, useCallback } from 'react'

export const useTokenData = (contractAddress: Address) => {
  const { address } = useAccount()
  const {
    setTotalSupply,
    setUserBalance,
    totalSupply: storeTotalSupply,
    userBalance: storeUserBalance,
  } = useContractTokenStore()

  const { data, isLoading, isError, refetch } = useReadContracts({
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

  const totalSupply = data?.[0]?.result
  const userBalance = data?.[1]?.result

  const formattedTotalSupply = totalSupply
    ? formatUnits(totalSupply, 18)
    : storeTotalSupply || '0'
  const formattedUserBalance = userBalance
    ? formatUnits(userBalance, 18)
    : storeUserBalance || '0'

  useEffect(() => {
    if (totalSupply && userBalance) {
      setTotalSupply(formatUnits(totalSupply, 18))
      setUserBalance(formatUnits(userBalance, 18))
    }
  }, [totalSupply, userBalance, setTotalSupply, setUserBalance])

  const manualRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  return {
    formattedTotalSupply,
    formattedUserBalance,
    isLoading,
    isError,
    refetch: manualRefetch,
  }
}
