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
import { FaPlus } from 'react-icons/fa6'

export default function MintTokens() {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <Button size={'md'}>
          <FaPlus />
          Mint
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="py-4 text-2xl">Mint Tokens</DrawerTitle>
          <DrawerDescription className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-lg font-semibold">
                Amount<span className="text-red-500">*</span>
              </p>
              <Input placeholder="Amount" />
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button size={'lg'}>Mint Tokens</Button>
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
