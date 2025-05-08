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
import { IoIosSend } from 'react-icons/io'

export default function TransferTokens() {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <Button size={'md'}>
          <IoIosSend />
          Transfer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="py-4 text-2xl">Transfer Tokens</DrawerTitle>
          <DrawerDescription className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-lg font-semibold">
                Amount<span className="text-red-500">*</span>
              </p>
              <Input placeholder="Amount" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-lg font-semibold">
                To Address<span className="text-red-500">*</span>
              </p>
              <Input placeholder="Address" />
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button size={'lg'}>Transfer Tokens</Button>
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
