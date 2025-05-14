import { useParams } from 'next/navigation'
import { Address, parseEther } from 'viem'
import { erc20Abi } from '@/lib/abis/erc20Abi'
import { useWriteContract, useAccount } from 'wagmi'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import WalletButton from '@/components/ui/wallet-button'
import { Input } from '@/components/ui/input'
import { IoIosSend } from 'react-icons/io'
import { useState } from 'react'
import { toast } from 'sonner'
import { MoonLoader } from 'react-spinners'

export default function TransferTokens() {
  const params = useParams<{ address: string }>()
  const contractAddress = params?.address as Address

  const { writeContractAsync, isPending } = useWriteContract()
  const { address } = useAccount()

  const [amount, setAmount] = useState('')
  const [toAddress, setToAddress] = useState('')

  const handleTransferTokens = async () => {
    if (!amount) {
      toast.error('Please enter an amount')
      return
    }

    if (!contractAddress) {
      toast.error('Please enter a contract address')
      return
    }

    if (!address) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      await writeContractAsync({
        address: contractAddress,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [toAddress as Address, parseEther(amount)],
      })
    } catch (error: unknown) {
      const err = error as Error
      console.error('Mint error details:', {
        error: err,
        message: err?.message,
        cause: err?.cause,
      })
      toast.error(
        `Failed to transfer tokens: ${err?.message || 'Unknown error'}`
      )
    }
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <Button size={'md'}>
          <IoIosSend />
          Transfer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="py-4 text-2xl">Transfer Tokens</DrawerTitle>
          <DrawerDescription className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-lg font-semibold">
                Amount<span className="text-red-500">*</span>
              </p>
              <Input
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                min="0"
                step="any"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-lg font-semibold">
                To Address<span className="text-red-500">*</span>
              </p>
              <Input
                placeholder="Address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
              />
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <WalletButton
            size={'lg'}
            onClick={() => handleTransferTokens()}
            disabled={isPending}
          >
            {isPending ? (
              <MoonLoader color="#000" size={20} />
            ) : (
              'Transfer Tokens'
            )}
          </WalletButton>
          <DrawerClose>
            <Button variant="outline" size={'full'}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
