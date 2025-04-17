import { usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'

export default function Login() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="border-border rounded-lg border p-3 bg-blend-saturation backdrop-blur-md max-sm:w-full sm:min-w-60">
        <div className="bg-card border-border min-w-120 flex flex-col gap-4 rounded-lg border p-3 max-sm:w-full">
          <div className="flex items-center justify-between pb-2">
            <span className="text-lg font-semibold">Login</span>
          </div>

          <div className="mt-4 flex w-full justify-between space-x-2">
            <Button size={'full'}>Login</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
