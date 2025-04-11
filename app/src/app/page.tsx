'use client'
import Link from 'next/link'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <section className="flex min-h-[calc(100vh-120px)] justify-center px-4 py-[20%] font-[family-name:var(--font-geist-sans)] sm:px-8 sm:py-[10%] lg:px-20">
        <div className="flex h-full flex-col items-center justify-center gap-12">
          <div className="grid gap-3 text-center">
            <h1 className="text-muted-foreground text-4xl font-bold sm:text-5xl lg:text-7xl">
              <span className="text-foreground">Smart contracts</span> <br />
              without the complexity
            </h1>
            <h2 className="text-muted text-lg sm:text-xl">
              Skip the complexity. Just click, deploy, and go live on-chain
              without any code.
            </h2>
          </div>
          <div className="flex gap-4">
            <Link href={'/contracts/'}>
              <Button size={'lg'}>Deploy Now</Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
