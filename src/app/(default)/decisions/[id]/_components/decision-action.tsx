'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '~/app/_components/button'
import { useDialogStore } from '~/app/_hooks/use-dialog-store'
import { api } from '~/trpc/react'

type DecisionActionProps = {
  isUserAdmin: boolean
  isHidden: boolean
  decisionBelongsToUser: boolean
  decisionId: number
}

export const DecisionAction = ({
  isUserAdmin,
  isHidden,
  decisionBelongsToUser,
  decisionId,
}: DecisionActionProps) => {
  const { handleDialog } = useDialogStore()

  return <></>
}
