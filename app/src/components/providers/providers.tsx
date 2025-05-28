'use client'
import { PrivyProvider } from '@privy-io/react-auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from '@privy-io/wagmi'
import { wagmiConfig } from '@/config/wagmiConfig'
import { privyConfig } from '@/config/privyConfig'
/* Backend */
import { ConvexProvider, ConvexReactClient } from 'convex/react'

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <ConvexProvider client={convex}>{children}</ConvexProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
