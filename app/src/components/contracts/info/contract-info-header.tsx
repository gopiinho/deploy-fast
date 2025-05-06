import { shortenAddress } from '@/lib/helpers/helpers'
import { IoCopyOutline } from 'react-icons/io5'

interface ContractInfoHeaderProps {
  name: string | undefined
  address: string
  type: string
  explorerUrl?: string
  chainId?: number
}

export default function ContractInfoHeader({
  name,
  address,
  type,
}: ContractInfoHeaderProps) {
  return (
    <section className="border-border flex w-full justify-between border-b px-2 py-6 sm:px-6">
      <div className="grid gap-3">
        <div className="flex items-end gap-4">
          <h5 className="text-2xl font-semibold sm:text-4xl">{name}</h5>
          <span className="rounded-xl border px-3 py-1 text-sm font-semibold">
            {type}
          </span>
        </div>
        <div className="border-border hover:bg-border inline-flex w-max cursor-pointer items-center gap-2 rounded-md border px-3 py-1 transition duration-150">
          <IoCopyOutline size={12} className="text-muted-foreground" />
          {shortenAddress(address)}
        </div>
      </div>
    </section>
  )
}
