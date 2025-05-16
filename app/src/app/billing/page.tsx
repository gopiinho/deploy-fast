'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IoMdCheckmark } from 'react-icons/io'
import PricingToggle from '@/components/ui/pricing-toggle'
import Link from 'next/link'
import { plans } from '@/lib/constants'

export default function Billing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plan = isAnnual ? plans[1] : plans[0]

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-8 max-sm:pb-24 max-sm:pt-12">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted-foreground mb-6 sm:text-xl">
          Choose the plan that works best for you
        </p>
      </div>
      <div className="mx-auto flex items-center justify-center">
        <div className="bg-card border-primary relative flex h-full flex-col gap-12 rounded-2xl border-2 p-8 text-start shadow-lg">
          <span className="bg-primary text-foreground absolute left-1/2 top-0 -translate-x-1/2 rounded-b-2xl px-4 text-lg font-bold">
            Pro
          </span>
          <div className="grid">
            <div className="my-2 flex justify-center">
              <PricingToggle onToggle={setIsAnnual} />
            </div>
            <p
              className={`p-2 text-center text-sm font-medium transition-opacity duration-150 ${
                isAnnual ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Save 33% with annual billing
            </p>
            <div className="mb-4">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground ml-1">
                {plan.duration}
              </span>
            </div>
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
          <Link
            href={plan.link + '?prefilled_email=' + ''}
            passHref
            className="w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default" className="w-full">
              Get Pro
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
