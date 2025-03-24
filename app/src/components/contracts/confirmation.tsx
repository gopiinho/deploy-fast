import { IoMdClose } from 'react-icons/io'
import { MdUpload } from 'react-icons/md'
import { Button } from '../ui/button'
import { shortenAddress } from '@/lib/helpers'

interface ConfirmationProps {
  onClick?: () => void
  isToken?: boolean
  tokenName?: string
  tokenSymbol?: string
  mintAmount?: number
  recipient?: string
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
  onClick,
  isToken,
  tokenName,
  tokenSymbol,
  mintAmount,
  recipient,
}: ConfirmationProps) {
  if (isToken)
    return (
      <div className="bg-background/90 fixed inset-0 z-50 flex items-center justify-center">
        <div className="border-border/30 rounded-lg border p-3 bg-blend-saturation backdrop-blur-md max-sm:w-full sm:min-w-60">
          <div className="bg-background border-border/40 min-w-120 flex flex-col gap-4 rounded-lg border p-3 max-sm:w-full">
            <div className="flex items-center justify-between pb-2">
              <span></span>
              <span className="text-lg font-semibold">Review Transaction</span>
              <IoMdClose size={20} />
            </div>
            <div className="space-y-4">
              <InputValue title="Token Name" value={tokenName} />
              <InputValue title="Token Symbol" value={tokenSymbol} />
              <InputValue title="Mint Amount" value={mintAmount} />
              <InputValue title="Recipient" value={recipient} isAddress />
            </div>
            <div className="mt-4 flex w-full justify-between space-x-2">
              <Button size={'full'} onClick={onClick}>
                Deploy Now <MdUpload />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
}
