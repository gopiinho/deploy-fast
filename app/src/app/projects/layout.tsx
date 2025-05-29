import RouteGuard from '@/components/auth/route-guard'
import { Suspense } from 'react'

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RouteGuard>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </RouteGuard>
  )
}
