'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Spotlight } from '@/components/ui/spotlight'

export default function Home() {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/projects/')
    }
  }, [ready, authenticated, router])

  return (
    <>
      <section className="relative flex min-h-[calc(100vh-120px)] justify-center overflow-hidden px-4 py-[20%] font-[family-name:var(--font-geist-sans)] antialiased sm:px-8 sm:py-[10%] lg:px-20">
        <Spotlight />
        <div className="flex h-full flex-col items-center justify-center gap-12">
          <div className="grid gap-3 text-center">
            <h1 className="text-muted-foreground text-4xl font-bold sm:text-5xl lg:text-7xl 2xl:text-8xl">
              <span className="text-foreground">Smart contracts</span> <br />
              without the complexity
            </h1>
            <h2 className="text-lg sm:text-xl">
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
