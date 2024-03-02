import '~/styles/globals.css'

import localFont from 'next/font/local'
import { cookies } from 'next/headers'

import { TRPCReactProvider } from '~/trpc/react'
import { classNames } from '~/utils/core'
import { ThemeProvider } from '~/app/_providers/theme'
import { Toaster } from '~/app/_providers/toaster'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { SearchDialog } from './_components/search-dialog'

const inter = localFont({
  variable: '--font-sans',
  display: 'swap',
  style: 'oblique 0deg 10deg',
  src: [
    {
      path: '../../public/fonts/inter-roman.var.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-italic.var.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
})
export const metadata = {
  title: 'Admitted.fyi',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={classNames('font-sans min-h-screen', inter.variable)}>
        <ThemeProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <main>{children}</main>
            <Toaster />
            <SearchDialog />
          </TRPCReactProvider>
          <SpeedInsights/>
          <Analytics/>
        </ThemeProvider>
      </body>
    </html>
  )
}
