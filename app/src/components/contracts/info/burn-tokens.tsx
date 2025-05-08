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
import { Input } from '@/components/ui/input'
import { FaFireFlameCurved } from 'react-icons/fa6'

export default function BurnTokens() {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <Button size={'md'}>
          <FaFireFlameCurved />
          Burn
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="py-4 text-2xl">Burn Tokens</DrawerTitle>
          <DrawerDescription className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-lg font-semibold">
                Amount<span className="text-red-500">*</span>
              </p>
              <Input placeholder="Amount" />
            </div>
            <p>
              Burning tokens will remove them from your balance and reduce the
              total supply of the token.
            </p>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button size={'lg'}>Burn Tokens</Button>
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
