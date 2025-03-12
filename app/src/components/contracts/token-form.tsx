import { FaStarOfLife } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import { Input } from '../ui/input'

interface TokenFormBlockProps {
  children: React.ReactNode
  title: string
}

interface TagProps {
  isRequired?: boolean
  title: string
  description?: string
}

function TokenFormBlock({ children, title }: TokenFormBlockProps) {
  return (
    <div className="flex flex-col">
      <div className="py-4 text-xl font-semibold lg:text-2xl">{title}</div>
      <div className="py-4">{children}</div>
    </div>
  )
}

function Tag({ isRequired, title, description }: TagProps) {
  return isRequired ? (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <span>{title}</span>
        <span className="text-red-500">
          <FaStarOfLife size={10} />
        </span>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  ) : (
    <div>{title}</div>
  )
}

export default function TokenForm() {
  return (
    <section>
      <TokenFormBlock title="Metadata">
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="flex w-[70%] flex-col gap-2">
              <Tag title="Name" isRequired />
              <Input />
            </div>
            <div className="flex w-[30%] flex-col gap-2">
              <Tag title="Symbol" isRequired />
              <Input />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Tag title="Description" />
            <textarea
              cols={20}
              className="border-input resize-none rounded-sm border p-3"
            />
          </div>
        </div>
      </TokenFormBlock>
      <TokenFormBlock title="Supply">
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col gap-2">
            <Tag title="Mint Amount" isRequired />
            <Input />
          </div>
          <div className="flex w-full flex-col gap-2">
            <Tag title="Recipient" isRequired />
            <Input />
          </div>
        </div>
      </TokenFormBlock>
      <TokenFormBlock title="Deploy Options">
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col gap-2">
            <Tag
              title="Chain"
              isRequired
              description="Select a network to deploy this contract on."
            />
            <div className="border-input hover:bg-primary-foreground flex h-12 cursor-pointer items-center justify-between rounded-sm border p-3 px-4 duration-200">
              <span>Ethereum Mainnet</span>
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      </TokenFormBlock>
    </section>
  )
}
