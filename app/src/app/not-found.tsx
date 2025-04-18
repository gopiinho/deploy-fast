import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="bg-background fixed inset-0 flex h-screen w-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col justify-center text-center">
        <p className="pb-3 text-2xl font-semibold sm:text-7xl">Oops, 404</p>
        <p className="opacity-70">
          The page you are looking for doesn't exist or has been moved
        </p>
      </div>
      <Link href="/">
        <Button size={'lg'}>Return Home</Button>
      </Link>
    </div>
  )
}
