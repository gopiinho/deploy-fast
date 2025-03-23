import Link from 'next/link'
import { LuRocket } from 'react-icons/lu'
import {
  ItemCard,
  ItemCardHeader,
  ItemCardTitle,
  ItemCardDescription,
  ItemCardFooter,
} from '../ui/item-card'
import { Button } from '../ui/button'
import { contracts } from '@/lib/contracts'

interface ContractItemProps {
  title: string
  description: string
  path: string
}

function ContractItem({ title, description, path }: ContractItemProps) {
  return (
    <ItemCard>
      <ItemCardHeader>
        <ItemCardTitle>
          {title} <span className="text-sm text-green-400">New</span>
        </ItemCardTitle>
        <ItemCardDescription>{description}</ItemCardDescription>
      </ItemCardHeader>
      <ItemCardFooter>
        <Link href={path}>
          <Button variant={'deploy'} size={'sm'}>
            Deploy
            <LuRocket size={50} />
          </Button>
        </Link>
      </ItemCardFooter>
    </ItemCard>
  )
}

export default function ItemCardList() {
  return (
    <div className="grid w-full grid-cols-1 justify-between gap-4 py-3 sm:grid-cols-2 lg:grid-cols-3">
      {contracts.map(({ title, description, path }) => (
        <ContractItem
          key={title}
          title={title}
          description={description}
          path={path}
        />
      ))}
    </div>
  )
}
