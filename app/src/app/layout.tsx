import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '../components/providers/providers'
import { PostHogProvider } from '../components/providers/analytics-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import Navbar from '@/components/navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DeployFast | No Code Smart Contracts',
  description: 'Deplop smart contracts without writing a single line of code.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PostHogProvider>
            <Providers>
              <Navbar />
              {children}
            </Providers>
          </PostHogProvider>{' '}
        </ThemeProvider>
      </body>
    </html>
  )
}
