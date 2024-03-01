'use client'

import { type Session } from 'next-auth'
import { Button } from './button'
import { ProfileMenu } from './profile-menu'
import { useSearchStore } from '~/app/_hooks/use-search-store'
import { AddDecisionButtonLink } from './add-decision-button'
import { usePathname } from 'next/navigation';


export const Actions = ({ session }: { session: Session | null }) => {
  const { toggleOpen } = useSearchStore();
  const currentPath = usePathname(); 
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <ProfileMenu session={session} pathname={currentPath}/>
      <AddDecisionButtonLink currentPath={currentPath}/>
    </div>
  )
}
