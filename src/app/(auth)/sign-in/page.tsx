import { type Metadata } from 'next'
import { getProviders } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { getServerAuthSession } from '~/server/auth'
import { SignInButtons } from './_components/sign-in-buttons'

export const metadata: Metadata = {
  title: 'Sign In - admitted.fyi',
}

export default async function SignIn() {
  const session = await getServerAuthSession()

  if (session?.user) {
    redirect('/')
  }

  const providers = await getProviders()

  return (
    <main className="min-h-screen relative flex items-center justify-center h-full bg-center bg-circle-grid dark:bg-circle-grid-dark">
      <div className="relative bottom-16">
        <div className="w-full space-y-4 text-center bg-primary">
          <SignInButtons providers={providers} />
        </div>
        <div className="-mt-4 md:mt-0 w-screen left-1/2 transform -translate-x-1/2 absolute sm:w-[434px] lg:w-[646px] xl:w-[862px] auth-footer">
        </div>
      </div>
    </main>
  )
}
