'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PricingToggleProps {
  onToggle?: (isAnnual: boolean) => void
  className?: string
}

export default function PricingToggle({
  onToggle,
  className,
}: PricingToggleProps) {
  const [isAnnual, setIsAnnual] = useState(false)

  const handleToggle = () => {
    const newValue = !isAnnual
    setIsAnnual(newValue)
    onToggle?.(newValue)
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'text-sm font-medium',
          !isAnnual ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        Monthly
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isAnnual}
        onClick={handleToggle}
        className={cn(
          'bg-muted focus-visible:ring-ring relative h-7 w-14 rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-2',
          isAnnual && 'bg-primary'
        )}
      >
        <motion.div
          className="h-5 w-5 rounded-full bg-white shadow-sm"
          initial={false}
          animate={{
            x: isAnnual ? 28 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
        <span className="sr-only">
          {isAnnual ? 'Annual billing' : 'Monthly billing'}
        </span>
      </button>

      <span
        className={cn(
          'text-sm font-medium',
          isAnnual ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        Annual
      </span>
    </div>
  )
}
