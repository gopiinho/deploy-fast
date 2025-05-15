'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Address } from 'viem'
import { useReadContract, useWriteContract, useAccount } from 'wagmi'
import { Input } from '@/components/ui/input'
import WalletButton from '@/components/ui/wallet-button'
import { erc20Abi } from '@/lib/abis/erc20Abi'
import HeaderCard from '@/components/ui/header-card'

export default function TokenPermissions() {
  const [newOwner, setNewOwner] = useState<Address>('' as Address)
  const [isTransferring, setIsTransferring] = useState(false)
  const [isRenouncing, setIsRenouncing] = useState(false)

  const params = useParams<{ address: string }>()
  const contractAddress = params?.address as Address

  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()

  const { data: currentOwner, refetch: refetchOwner } = useReadContract({
    address: contractAddress,
    abi: erc20Abi,
    functionName: 'owner',
  })

  const checkIfOwnerIsConnectedWallet = currentOwner === address

  const handleTransferOwnership = async () => {
    if (!contractAddress || !newOwner) return

    try {
      setIsTransferring(true)
      await writeContractAsync({
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'transferOwnership',
        args: [newOwner],
      })
    } catch (error) {
      console.error('Error transferring ownership:', error)
    } finally {
      refetchOwner()
      setIsTransferring(false)
    }
  }

  const handleRenounceOwnership = async () => {
    if (!contractAddress) return

    try {
      setIsRenouncing(true)
      await writeContractAsync({
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'renounceOwnership',
      })
    } catch (error) {
      console.error('Error renouncing ownership:', error)
    } finally {
      setIsRenouncing(false)
    }
  }
  return (
    <div className="grid gap-4">
      <HeaderCard title="Current Owner">
        <div className="flex w-full flex-col justify-between gap-3 p-4">
          <div className="grid w-full gap-2">
            <p className="text-muted-foreground">
              Current owner of the contract.
            </p>
            <div className="flex gap-2 lg:w-[40%]">
              <Input value={currentOwner} className="bg-background"></Input>
            </div>
          </div>
        </div>
      </HeaderCard>
      {checkIfOwnerIsConnectedWallet ? (
        <>
          <HeaderCard title="Transfer Ownership">
            <div className="flex w-full flex-col justify-between gap-3 p-4">
              <div className="grid w-full gap-2">
                <p className="text-muted-foreground">
                  Address to be the new owner of the contract.
                </p>
                <div className="flex gap-2 lg:w-[40%]">
                  <Input
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value as Address)}
                    className="bg-background"
                    placeholder="0x0000000000000000000000000000000000000000"
                  ></Input>
                </div>
                <div className="flex items-end justify-end pt-4">
                  <WalletButton
                    size={'lg'}
                    variant={'outline'}
                    onClick={handleTransferOwnership}
                    disabled={isTransferring}
                  >
                    {isTransferring ? 'Transferring...' : 'Transfer Ownership'}
                  </WalletButton>
                </div>
              </div>
            </div>
          </HeaderCard>
          <HeaderCard title="Renounce Ownership">
            <div className="flex w-full flex-col justify-between gap-3 p-4">
              <div className="grid w-full gap-2">
                <p className="text-muted-foreground">
                  The contract will no longer have an owner and will be owned by
                  the zero address.
                </p>
                <div className="flex gap-2 lg:w-[40%]"></div>
                <div className="flex items-end justify-end pt-4">
                  <WalletButton
                    size={'lg'}
                    variant={'delete'}
                    onClick={handleRenounceOwnership}
                    disabled={isRenouncing}
                  >
                    {isRenouncing ? 'Renouncing...' : 'Renounce'}
                  </WalletButton>
                </div>
              </div>
            </div>
          </HeaderCard>
        </>
      ) : null}
    </div>
  )
}
