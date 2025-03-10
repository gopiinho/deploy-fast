import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] justify-center px-20 font-[family-name:var(--font-geist-sans)] sm:py-[10%]">
      <div className="flex h-full flex-col items-center justify-center gap-12">
        <div className="grid gap-3 text-center">
          <h2 className="text-4xl font-bold sm:text-6xl xl:text-7xl">
            Ship your smart contracts instantly!
          </h2>
          <p className="text-muted text-xl sm:text-2xl">
            Writing, testing, and deploying smart contracts is complex, but it
            doesn&apos;t have to be. Do it in 1 click.
          </p>
        </div>
        <Button size={'lg'}>Start Deploying</Button>
      </div>
    </section>
  )
}
