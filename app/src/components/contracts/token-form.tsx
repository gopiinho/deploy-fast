'use client'
import { useEffect, useState, useCallback } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { IoIosArrowDown } from 'react-icons/io'
import { MdUpload } from 'react-icons/md'
import { usePublicClient, useWriteContract } from 'wagmi'
import {
  Address,
  parseEther,
  encodeAbiParameters,
  parseAbiParameters,
  getAddress,
} from 'viem'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from 'convex/react'

import { api } from '../../../convex/_generated/api'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useErc20FormStore } from '@/state/erc20FormStore'
import { useUserStore } from '@/state/userStore'
import { FormBlock } from '../form-block'
import { FormTag } from '../form-tag'
import { dfManagerAbi } from '@/lib/abis/dfManagerAbi'
import { DF_MANAGER } from '@/lib/constants'
import Confirmation from './confirmation'
import ProjectContract from '../projects/project-contract'
import DeployStatus from './deploy-status'
import { DeployStatusType } from '@/lib/types'
import {
  ERC20_SOURCE_CODE,
  ERC20_COMPILER_VERSION,
  ETHERSCAN_CONTRACT_NAME,
  VERIFICATION_API_ENDPOINT,
  TARGET_CHAIN_ID,
  CODE_FORMAT,
  OPTIMIZER_ENABLED,
  OPTIMIZER_RUNS,
} from '@/lib/contract-verify/token/token-details'
import { useVerifyContract } from '@/hooks/useVerifyContract'

const formSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name cannot exceed 60 characters'),
  symbol: z
    .string()
    .min(2, 'Symbol must be at least 2 characters')
    .max(50, 'Symbol cannot exceed 50 characters'),
  mintAmount: z.coerce.number().min(1, 'Mint amount must be at least 1'),
  recipient: z.string().refine((addr) => /^0x[a-fA-F0-9]{40}$/.test(addr), {
    message: 'Invalid Ethereum address format',
  }),
})

export default function TokenForm() {
  const [deployedContract, setDeployedContract] = useState<string | null>(null)
  const { user } = usePrivy()
  const { writeContractAsync } = useWriteContract()
  const {
    name,
    symbol,
    mintAmount,
    recipient,
    confirming,
    setConfirming,
    loading,
    setLoading,
    deployStatus,
    setDeployStatus,
  } = useErc20FormStore()
  const { activeProject } = useUserStore()
  const client = usePublicClient()

  const { verifyContract, clearState: clearVerificationState } =
    useVerifyContract()

  const addContractToProject = useMutation(api.contracts.createContract)

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
  }, [user?.wallet?.address, form.setValue, form])

  const handleDeployToken = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      setLoading(true)
      clearVerificationState()

      let deployedAddress: Address | null = null
      let constructorArgsEncoded: string | undefined = undefined

      try {
        const deployerAddress = user?.wallet?.address

        if (!deployerAddress) {
          throw new Error(
            'User wallet address not found for deployer argument.'
          )
        }

        const abiEncoded = encodeAbiParameters(
          parseAbiParameters(
            'string name, string symbol, uint256 mintAmount, address mintTo, address deployer'
          ),
          [
            values.name,
            values.symbol,
            parseEther(values.mintAmount.toString()),
            values.recipient as Address,
            deployerAddress as Address,
          ]
        )
        constructorArgsEncoded = abiEncoded.startsWith('0x')
          ? abiEncoded.substring(2)
          : abiEncoded
      } catch (error) {
        console.error(error)
        setLoading(false)
        setConfirming(false)
        return
      }

      try {
        const hash = await writeContractAsync({
          abi: dfManagerAbi,
          address: DF_MANAGER,
          functionName: '_deployErc20',
          args: [
            values.name,
            values.symbol,
            parseEther(values.mintAmount.toString()),
            values.recipient as Address,
          ],
        })

        setDeployStatus(DeployStatusType.Deploying)

        if (client) {
          const tx = await client.waitForTransactionReceipt({ hash })

          if (tx.logs && tx.logs.length > 0 && tx.logs[0].address) {
            deployedAddress = tx.logs[0].address

            setDeployedContract(deployedAddress)
            setDeployStatus(DeployStatusType.Deployed)
            if (activeProject && deployedAddress) {
              await addContractToProject({
                name: values.name,
                address: getAddress(deployedAddress),
                type: 'Token',
                projectId: activeProject?._id,
              })
            }

            if (!constructorArgsEncoded) {
            } else {
              setDeployStatus(DeployStatusType.Verifying)

              await verifyContract(VERIFICATION_API_ENDPOINT, {
                chainId: TARGET_CHAIN_ID,
                codeformat: CODE_FORMAT,
                sourceCode: ERC20_SOURCE_CODE,
                contractaddress: deployedAddress,
                contractname: ETHERSCAN_CONTRACT_NAME,
                compilerversion: ERC20_COMPILER_VERSION,
                constructorArguements: constructorArgsEncoded,
                optimizationUsed: OPTIMIZER_ENABLED,
                runs: OPTIMIZER_RUNS,
              })

              setDeployStatus(DeployStatusType.Verified)
            }
          } else {
            throw new Error('Failed to extract deployed contract address.')
          }
        } else {
          throw new Error('Client not available for transaction monitoring.')
        }

        setConfirming(false)
      } catch (error) {
        console.error(error)
        setDeployStatus(DeployStatusType.Error)
        setConfirming(false)
      } finally {
        setLoading(false)
      }
    },
    [
      user?.wallet?.address,
      setLoading,
      setDeployStatus,
      clearVerificationState,
      writeContractAsync,
      client,
      activeProject,
      addContractToProject,
      verifyContract,
      setConfirming,
    ]
  )

  async function handleOpenConfirmation() {
    const isValid = await form.trigger()

    if (isValid) {
      setConfirming(true)
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
              {/* <div className="flex w-full flex-col gap-2">
                <FormTag title="Description" />
                <textarea
                  cols={50}
                  className="border-input resize-none rounded-sm border p-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div> */}
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
                        <Input
                          {...field}
                          type="number"
                          className="[&::-moz-appearance:textfield] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
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
          <FormBlock title="Add To Project">
            <div className="flex flex-col gap-4">
              <div className="flex w-full flex-col gap-2">
                <FormTag
                  title="Project"
                  isRequired
                  description="Save the deployed contract in a project's contract list on deployfast dashboard"
                />
                <ProjectContract />
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
                <div className="border-input hover:bg-accent flex h-12 cursor-not-allowed items-center justify-between rounded-sm border p-3 px-4 duration-150 lg:w-[40%]">
                  <span>Base Sepolia</span>
                  <IoIosArrowDown />
                </div>
              </div>
            </div>
          </FormBlock>
          <Button size="lg" type="button" onClick={handleOpenConfirmation}>
            Deploy Now <MdUpload />
          </Button>
          {confirming && (
            <Confirmation
              close={() => setConfirming(false)}
              onClick={form.handleSubmit(handleDeployToken)}
              isToken
              tokenName={form.getValues('name')}
              tokenSymbol={form.getValues('symbol')}
              mintAmount={form.getValues('mintAmount')}
              recipient={form.getValues('recipient')}
              isLoading={loading}
            />
          )}
        </form>
        {deployStatus !== DeployStatusType.Idle ? (
          <DeployStatus
            address={deployedContract}
            status={deployStatus}
            close={() => setDeployStatus(DeployStatusType.Idle)}
          />
        ) : null}
      </Form>
    </section>
  )
}
