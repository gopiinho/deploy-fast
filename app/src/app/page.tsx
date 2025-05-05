'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Spotlight } from '@/components/ui/spotlight'
import Features from '@/components/landing/features'
import Pricing from '@/components/landing/pricing'

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
      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-start gap-12 overflow-hidden px-4 py-[20%] font-[family-name:var(--font-geist-sans)] antialiased max-sm:flex-col max-sm:gap-10 sm:px-8 sm:py-[10%] lg:grid-cols-2 lg:px-20">
        <Spotlight />
        <div className="flex h-full flex-col items-start justify-start gap-12 py-4">
          <div className="grid gap-3 text-start">
            <h1 className="text-muted-foreground text-4xl font-bold sm:text-5xl lg:text-7xl 2xl:text-8xl">
              <span className="text-foreground">No-Code Solution for</span>
              <br />
              Smart Contracts
            </h1>
            <h2 className="text-lg sm:text-xl lg:max-w-[60%]">
              Build, configure, and deploy secure smart contracts across
              multiple blockchains, with no code tool.
            </h2>
          </div>
          <div className="flex gap-4">
            <Link href={'/contracts/'}>
              <Button size={'lg'}>Deploy Now</Button>
            </Link>
          </div>
        </div>
      </section>
      <Features />
      <Pricing />
      <Footer />
    </>
  )
}
