import RouteGuard from '@/components/auth/route-guard'

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RouteGuard>{children}</RouteGuard>
}
