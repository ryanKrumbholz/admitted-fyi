'use client'

import { useRouter } from 'next/navigation'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Button } from '~/app/_components/button'
import { useDialogStore } from '~/app/_hooks/use-dialog-store'
import { api } from '~/trpc/react'

type EditFormData = {
  name: string
}

const EditProfileDialog = ({
  user,
}: {
  user: {
    name: string
    title: string | null
  }
}) => {
  const { handleDialogClose } = useDialogStore()

  const { register, handleSubmit, reset } = useForm<EditFormData>({
    defaultValues: {
      name: user.name,
    },
  })
  const router = useRouter()
  const editUserMutation = api.user.edit.useMutation({
    onSuccess: () => {
      router.refresh()
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`)
    },
  })

  const handleClose = () => {
    handleDialogClose()
    reset()
  }

  const onSubmit: SubmitHandler<EditFormData> = (data) => {
    editUserMutation.mutate(
      {
        name: data.name,
      },
      {
        onSuccess: () => handleDialogClose(),
      },
    )
  }

  return <form onSubmit={handleSubmit(onSubmit)}></form>
}

export const EditProfileAction = ({
  user,
}: {
  user: {
    name: string
    title: string | null
  }
}) => {
  const { handleDialog } = useDialogStore()
  return (
    <div className="ml-auto mr-10">
      <Button
        variant="secondary"
        onClick={() => {
          handleDialog({
            content: <EditProfileDialog user={user} />,
          })
        }}
      >
      </Button>
    </div>
  )
}
