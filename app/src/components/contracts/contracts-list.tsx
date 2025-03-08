import { LuRocket } from 'react-icons/lu'
import {
  ItemCard,
  ItemCardHeader,
  ItemCardTitle,
  ItemCardDescription,
  ItemCardFooter,
} from '../ui/item-card'
import { Button } from '../ui/button'

function Item() {
  return (
    <ItemCard>
      <ItemCardHeader>
        <ItemCardTitle>Token</ItemCardTitle>
        <ItemCardDescription>
          Implementation of standard ERC20 token.
        </ItemCardDescription>
      </ItemCardHeader>
      <ItemCardFooter>
        <Button variant={'deploy'} size={'sm'}>
          Deploy
          <LuRocket size={50} />
        </Button>
      </ItemCardFooter>
    </ItemCard>
  )
}

export default function ItemCardList() {
  return (
    <div className="grid w-full grid-cols-1 justify-between gap-4 py-3 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Item key={item} />
      ))}
    </div>
  )
}
