import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { Providers } from '../components/providers/providers'
import { PostHogProvider } from '../components/providers/analytics-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import AuthWrapper from '@/components/auth/auth-wrapper'
import Navigator from '@/components/navigator'
import { SITE_NAME, SITE_INFO, SITE_URL, SITE_DESCRIPTION } from '@/lib/site'

const openRoboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} · ${SITE_INFO}`,
    template: `${SITE_NAME} · %s`,
  },
  metadataBase: new URL(SITE_URL),
  description: SITE_DESCRIPTION,
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="min-h-screen">
      <body
        className={`${openRoboto.variable} font-[family-name:var(--font-roboto)] antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <Providers>
              <AuthWrapper>
                <Navigator />
                {children}
                <Toaster richColors />
              </AuthWrapper>
            </Providers>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
