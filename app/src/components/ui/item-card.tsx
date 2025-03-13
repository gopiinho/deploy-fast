import * as React from 'react'

import { cn } from '@/lib/utils'

function ItemCard({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground hover:border-secondary border-primary-foreground flex flex-col gap-6 rounded-md border py-4 shadow-sm duration-150 hover:cursor-pointer',
        className
      )}
      {...props}
    />
  )
}

function ItemCardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 px-5', className)}
      {...props}
    />
  )
}

function ItemCardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('text-xl font-semibold leading-none', className)}
      {...props}
    />
  )
}

function ItemCardDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  )
}

function ItemCardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function ItemCardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('mt-6 flex items-center justify-end px-6', className)}
      {...props}
    />
  )
}

export {
  ItemCard,
  ItemCardHeader,
  ItemCardFooter,
  ItemCardTitle,
  ItemCardDescription,
  ItemCardContent,
}
