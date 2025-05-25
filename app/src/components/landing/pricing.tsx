'use client'
import { IoMdCheckmark } from 'react-icons/io'
import { Button } from '../ui/button'
import { usePrivy } from '@privy-io/react-auth'

export default function Pricing() {
  const { login } = usePrivy()

  return (
    <div
      id="pricing"
      className="mx-auto grid items-center gap-12 px-4 py-16 text-center lg:max-w-[97%] lg:py-24"
    >
      <h3 className="text-3xl font-semibold sm:text-5xl">Pricing</h3>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        <div className="bg-card relative flex h-full flex-col justify-between gap-12 rounded-2xl border-2 p-8 text-start shadow-lg">
          <span className="bg-foreground text-background absolute left-1/2 top-0 -translate-x-1/2 rounded-b-2xl px-4 text-lg font-bold">
            Starter
          </span>
          <div className="grid">
            <span className="mb-1 mt-2 text-3xl font-bold lg:text-4xl">$0</span>
            <span className="text-muted-foreground">Free for all users.</span>
            <div className="mt-3 grid">
              <div className="grid gap-3">
                <span className="flex items-center gap-1">
                  <IoMdCheckmark className="text-muted-foreground" />1 Project
                </span>
                <span className="flex items-center gap-1">
                  <IoMdCheckmark className="text-muted-foreground" />
                  Up to 10 deployed smart contracts
                </span>
                <span className="flex items-center gap-1">
                  <IoMdCheckmark className="text-muted-foreground" />
                  Contracts Management Dashboard
                </span>
              </div>
            </div>
          </div>
          <Button variant={'outline'} onClick={login}>
            Get Started
          </Button>
        </div>
        <div className="bg-card border-primary relative flex h-full flex-col gap-12 rounded-2xl border-2 p-8 text-start shadow-lg">
          <span className="bg-primary text-foreground absolute left-1/2 top-0 -translate-x-1/2 rounded-b-2xl px-4 text-lg font-bold">
            Pro
          </span>
          <div className="grid">
            <span className="mb-1 mt-2 text-3xl font-bold lg:text-4xl">
              $10 <span className="text-xl">per /month</span>
            </span>
            <span className="text-muted-foreground">Free for all users.</span>
            <div className="mt-3 grid">
              <div className="grid gap-3">
                <span className="flex items-center gap-1 font-semibold">
                  Everything in Starter, plus:
                </span>
                <span className="flex items-center gap-1">
                  <IoMdCheckmark className="text-muted-foreground" />
                  Unlimited Projects
                </span>
                <span className="flex items-center gap-1">
                  <IoMdCheckmark className="text-muted-foreground" />
                  Unlimited deployed smart contracts
                </span>
                <span className="flex items-center gap-1">
                  <IoMdCheckmark className="text-muted-foreground" />
                  Explorer verification
                </span>
              </div>
            </div>
          </div>
          <Button variant={'default'} onClick={login}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}
