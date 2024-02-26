'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '~/app/_components/button'
import {
  AlertDialogAction,
  AlertDialogActions,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
} from '~/app/_components/alert-dialog'
import {
  Menu,
  MenuButton,
  MenuItemButton,
  MenuItems,
  MenuItem,
  MenuItemsContent,
  MenuItemLink,
} from '~/app/_components/menu'
import { useDialogStore } from '~/app/_hooks/use-dialog-store'
import DotsIcon from '~/app/_svg/dots-icon'
import EditIcon from '~/app/_svg/edit-icon'
import EyeIcon from '~/app/_svg/eye-icon'
import TrashIcon from '~/app/_svg/trash-icon'
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
