'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'
import Footer from '@/components/footer'
import Logo from '../../../public/deployfast.svg'
import { useRouter } from 'next/navigation'

export default function Login() {
  const { login, ready, authenticated } = usePrivy()
  const router = useRouter()

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/projects')
    }
  }, [ready, authenticated, router])

  const handleLogin = () => {
    login()
  }

  return (
    <div>
      <div className="relative flex min-h-[calc(100vh-120px)] w-full flex-grow items-center justify-center">
        <div className="border-border rounded-lg border p-3 bg-blend-saturation shadow-xl backdrop-blur-md max-sm:w-full sm:min-w-60">
          <div className="bg-card border-border flex min-w-80 flex-col gap-4 rounded-lg border p-3 max-sm:w-full">
            <div className="flex flex-col items-center justify-center pb-8">
              <div className="mb-3">
                <Image src={Logo} alt="App Logo" width={60} height={60} />
              </div>
              <h1 className="text-xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Sign in to continue to your account
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/contracts">
                <Button size={'full'} variant={'outline'} onClick={handleLogin}>
                  Browse Contracts
                </Button>
              </Link>
              <Button size={'full'} onClick={handleLogin}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
