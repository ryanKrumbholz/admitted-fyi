import Link from 'next/link'
import { getServerAuthSession } from '~/server/auth'

import { Actions } from './actions'
import { TextLogo } from './logo'

export const Header = async () => {
  const session = await getServerAuthSession()
  return (
    <header className="flex items-center justify-between gap-4 py-12 md:py-20">
      <TextLogo/>
      <Actions session={session} />
    </header>
  )
}
