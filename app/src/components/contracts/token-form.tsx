'use client'
import { useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { IoIosArrowDown } from 'react-icons/io'
import { MdUpload } from 'react-icons/md'
import { useWriteContract } from 'wagmi'
import { Address } from 'viem'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import useErc20FormStore from '@/state/erc20FormStore'
import { FormBlock } from '../form-block'
import { FormTag } from '../form-tag'
import { dfManagerAbi } from '@/lib/dfManagerAbi'
import { DF_MANAGER } from '@/lib/constants'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  symbol: z.string().min(2).max(50),
  mintAmount: z.coerce.number(),
  recipient: z.string(),
})

export default function TokenForm() {
  const { user } = usePrivy()
  const { writeContractAsync } = useWriteContract()
  const { name, symbol, description, mintAmount, recipient, setDescription } =
    useErc20FormStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
      symbol: symbol,
      mintAmount: mintAmount,
      recipient: recipient,
    },
  })

  useEffect(() => {
    if (user?.wallet?.address) {
      form.setValue('recipient', user.wallet.address as Address)
    }
  }, [user?.wallet?.address, form.setValue])

  async function handleDeployToken(values: z.infer<typeof formSchema>) {
    try {
      const finalRecipient =
        recipient.trim() || (user?.wallet?.address as Address)

      if (!finalRecipient) {
        alert('Recipient address is required.')
        return
      }
      console.log(values)
      await writeContractAsync({
        abi: dfManagerAbi,
        address: DF_MANAGER,
        functionName: '_deployErc20',
        args: [
          values.name,
          values.symbol,
          BigInt(values.mintAmount),
          values.recipient as Address,
        ],
      })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
        console.log(values)
      }
    }
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleDeployToken)}
          className="space-y-8"
        >
          <FormBlock title="Metadata">
            <div className="flex flex-col gap-4">
              <div className="flex w-full gap-4">
                <div className="flex w-[70%] flex-col gap-2">
                  <FormTag title="Name" isRequired />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-[30%] flex-col gap-2">
                  <FormTag title="Symbol" isRequired />
                  <FormField
                    control={form.control}
                    name="symbol"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
                <FormField
                  control={form.control}
                  name="mintAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <FormTag title="Recipient" isRequired />
                <FormField
                  control={form.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={
                            user?.wallet?.address || 'Enter recipient address'
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
          <Button size={'lg'} type="submit">
            Deploy Now <MdUpload />
          </Button>
        </form>
      </Form>
    </section>
  )
}
