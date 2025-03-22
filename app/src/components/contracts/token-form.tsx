'use client'
import { usePrivy } from '@privy-io/react-auth'
import { IoIosArrowDown } from 'react-icons/io'
import { MdUpload } from 'react-icons/md'
import { useWriteContract } from 'wagmi'
import { Address } from 'viem'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useErc20FormStore from '@/state/erc20FormStore'
import { FormBlock } from '../form-block'
import { FormTag } from '../form-tag'
import { dfManagerAbi } from '@/lib/dfManagerAbi'
import { DF_MANAGER } from '@/lib/constants'

interface HandleTokenDeployProps {
  name: string
  symbol: string
  mintAmount: number
  recipient: string
}

export default function TokenForm() {
  const { user } = usePrivy()
  const { writeContractAsync } = useWriteContract()
  const {
    name,
    symbol,
    description,
    mintAmount,
    recipient,
    setName,
    setSymbol,
    setDescription,
    setMintAmount,
    setRecipient,
  } = useErc20FormStore()

  async function handleDeployToken({
    name,
    symbol,
    mintAmount,
    recipient,
  }: HandleTokenDeployProps) {
    try {
      const finalRecipient =
        recipient.trim() || (user?.wallet?.address as Address)

      if (!finalRecipient) {
        alert('Recipient address is required.')
        return
      }
      let tx = await writeContractAsync({
        abi: dfManagerAbi,
        address: DF_MANAGER,
        functionName: '_deployErc20',
        args: [name, symbol, BigInt(mintAmount), finalRecipient as Address],
      })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return (
    <section>
      <FormBlock title="Metadata">
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="flex w-[70%] flex-col gap-2">
              <FormTag title="Name" isRequired />
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex w-[30%] flex-col gap-2">
              <FormTag title="Symbol" isRequired />
              <Input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <FormTag title="Description" />
            <textarea
              cols={50}
              className="border-input resize-none rounded-sm border p-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </FormBlock>
      <FormBlock title="Supply">
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col gap-2">
            <FormTag title="Mint Amount" isRequired />
            <Input
              value={mintAmount}
              onChange={(e) => setMintAmount(Number(e.target.value) || 0)}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <FormTag title="Recipient" isRequired />
            <Input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={user?.wallet?.address || 'Enter recipient address'}
            />

            {/* <Input /> */}
          </div>
        </div>
      </FormBlock>
      <FormBlock title="Deploy Options">
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col gap-2">
            <FormTag
              title="Chain"
              isRequired
              description="Select a network to deploy this contract on."
            />
            <div className="border-input hover:bg-primary-foreground flex h-12 cursor-pointer items-center justify-between rounded-sm border p-3 px-4 duration-150 lg:w-[40%]">
              <span>Base Sepolia</span>
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      </FormBlock>
      <Button
        size={'lg'}
        onClick={() =>
          handleDeployToken({
            name,
            symbol,
            mintAmount: mintAmount ?? 0,
            recipient,
          })
        }
      >
        Deploy Now <MdUpload />
      </Button>
    </section>
  )
}
