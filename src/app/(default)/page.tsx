import { api } from '~/trpc/server'
import { getServerAuthSession } from '~/server/auth'
import { Pagination } from '../_components/pagination'

const POSTS_PER_PAGE = 20

export default async function Index({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>
}) {
  const currentPageNumber = searchParams.page ? Number(searchParams.page) : 1

  const session = await getServerAuthSession()

  return <></>
}
