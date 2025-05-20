import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Signup() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-start">
      <div className="flex w-full justify-between border-b px-4 py-10">
        <h3 className="hidden text-2xl font-semibold max-sm:block lg:text-4xl">
          Get started
        </h3>
        <h3 className="text-2xl font-semibold max-sm:hidden lg:text-4xl">
          Get started with DeployFast
        </h3>
        <Button variant={'outline'}>Logout</Button>
      </div>
      <div className="my-4 flex h-full w-full flex-col items-start justify-start overflow-hidden rounded-2xl border sm:m-4 lg:w-[40%]">
        <div className="bg-card w-full border-b p-6 text-lg font-semibold">
          Create Account
        </div>
        <div className="grid w-full gap-8 px-6 py-8">
          <div className="grid gap-1">
            <span className="font-semibold">Name</span>
            <Input className="bg-background" />
          </div>
          <div className="grid gap-1">
            <span className="font-semibold">
              Email <span className="text-red-400">*</span>
            </span>
            <Input className="bg-background" />
          </div>
        </div>
        <div className="flex w-full justify-end border-t px-6 py-8">
          <Button>Create Account</Button>
        </div>
      </div>
    </div>
  )
}
