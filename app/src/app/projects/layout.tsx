import RouteGuard from '@/components/auth/route-guard'

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RouteGuard>{children}</RouteGuard>
}
