import { Pagination } from '~/app/_components/pagination'

import { getServerAuthSession } from '~/server/auth'
import { api } from '~/trpc/server'
import { EditProfileAction } from './_components/edit-profile'

type ProfilePageParams = {
  params: {
    userId: string
  }
  searchParams: Record<string, string | undefined>
}

export const generateMetadata = async ({ params }: ProfilePageParams) => {
  const profile = await api.user.profile.query({
    id: params.userId,
  })

  if (!profile) return

  return {
    title: `${profile.name} - Beam`,
  }
}

const POSTS_PER_PAGE = 20

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageParams) {
  const currentPageNumber = searchParams.page ? Number(searchParams.page) : 1

  const profile = await api.user.profile.query({
    id: params.userId,
  })

  // const session = await getServerAuthSession()

  if (!profile) return

  // const profileBelongsToUser = profile.id === session!.user.id

  return (
    <>
      <div className="relative flex items-center gap-4 py-8 overflow-hidden">
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <h1 className="bg-primary text-2xl font-semibold tracking-tight md:text-3xl">
              {profile.name}
            </h1>

          </div>
        </div>

        {/* {profileBelongsToUser && (
          <EditProfileAction
            user={{
              name: profile.name!,
              title: profile.title,
            }}
          />
        )} */}

      </div>
    </>
  )
}
