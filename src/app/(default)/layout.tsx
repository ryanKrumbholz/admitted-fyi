import { type ReactNode } from 'react'
import { Header } from '../_components/header'
import { Footer } from '../_components/footer'
import { AuthProvider } from '../_providers/auth'
import { getServerAuthSession } from '~/server/auth'

export default async function DefaultLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerAuthSession()

  return (
    <AuthProvider session={session}>
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto">
        <Header/>
        <main className="flex-grow">
          {children}
        </main>
          <Footer />
      </div>
    </AuthProvider>
  )
}
