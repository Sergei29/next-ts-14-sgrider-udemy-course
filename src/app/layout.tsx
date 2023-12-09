import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import AuthSessionProvider from '@/providers/AuthSessionProvider'
import NextUIProvider from '@/providers/NextUIProvider'
import { auth } from '@/lib/auth'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <AuthSessionProvider session={session}>
            <main>{children}</main>
          </AuthSessionProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}

export default RootLayout
