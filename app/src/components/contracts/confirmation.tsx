import { IoMdClose } from 'react-icons/io'
import { MdUpload } from 'react-icons/md'
import { MoonLoader } from 'react-spinners'
import { Button } from '../ui/button'
import { shortenAddress } from '@/lib/helpers'

interface ConfirmationProps {
  onClick?: () => void
  isToken?: boolean
  tokenName?: string
  tokenSymbol?: string
  mintAmount?: number
  recipient?: string
  close?: () => void
  isLoading?: boolean
}

interface InputValueProps {
  title: string
  value: any
  isAddress?: boolean
}

function InputValue({ title, value, isAddress }: InputValueProps) {
  return (
    <div className="flex flex-col">
      <div className="text-muted font-medium">{title}</div>
      {isAddress ? (
        <div className="text-semibold text-xl">{shortenAddress(value)}</div>
      ) : (
        <div className="text-semibold text-xl">{value}</div>
      )}
    </div>
  )
}

export default function Confirmation({
  isToken,
  tokenName,
  tokenSymbol,
  mintAmount,
  recipient,
  close,
  isLoading,
}: ConfirmationProps) {
  if (isToken)
    return (
      <div
        className="bg-background/90 fixed inset-0 z-50 flex items-center justify-center"
        onClick={close}
      >
        <div
          className="border-border/30 rounded-lg border p-3 bg-blend-saturation backdrop-blur-md max-sm:w-full sm:min-w-60"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-background border-border/40 min-w-120 flex flex-col gap-4 rounded-lg border p-3 max-sm:w-full">
            <div className="flex items-center justify-between pb-2">
              <span></span>
              <span className="text-lg font-semibold">Review Transaction</span>
              <IoMdClose
                size={20}
                onClick={close}
                className="cursor-pointer duration-150 hover:opacity-50"
              />
            </div>
            <div className="space-y-4">
              <InputValue title="Token Name" value={tokenName} />
              <InputValue title="Token Symbol" value={tokenSymbol} />
              <InputValue title="Mint Amount" value={mintAmount} />
              <InputValue title="Recipient" value={recipient} isAddress />
            </div>
            <div className="mt-4 flex w-full justify-between space-x-2">
              <Button size={'full'} type="submit">
                {isLoading ? (
                  <MoonLoader size={20} />
                ) : (
                  <>
                    Deploy Now <MdUpload />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
}
