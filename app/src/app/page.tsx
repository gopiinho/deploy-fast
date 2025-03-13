import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] justify-center px-20 font-[family-name:var(--font-geist-sans)] sm:py-[10%]">
      <div className="flex h-full flex-col items-center justify-center gap-12">
        <div className="grid gap-3 text-center">
          <h2 className="text-muted-foreground text-4xl font-bold sm:text-6xl lg:text-7xl">
            Ship your <span className="text-foreground">smart contracts</span>{' '}
            <br /> instantly!
          </h2>
          <p className="text-muted text-lg sm:text-xl">
            Writing, testing, and deploying smart contracts is complex, but it
            doesn&apos;t have to be.
          </p>
        </div>
        <Link href={'/contracts/'}>
          <Button size={'lg'}>Start Deploying</Button>
        </Link>
      </div>
    </section>
  )
}
