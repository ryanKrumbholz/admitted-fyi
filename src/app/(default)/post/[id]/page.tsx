import { AuthorWithDate } from '~/app/_components/author-with-date'
import { Banner } from '~/app/_components/banner'
import { Button } from '~/app/_components/button'
import { Comment, AddCommentForm } from '~/app/_components/comment'

import { HtmlView } from '~/app/_components/html-view'
import { ReactionButton } from '~/app/_components/like-button'

import MessageIcon from '~/app/_svg/message-icon'

import { getServerAuthSession } from '~/server/auth'
import { api } from '~/trpc/server'

type PostPageParams = {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params }: PostPageParams) => {
  const post = await api.post.detail.query({
    id: Number(params.id),
  })

  if (!post) return

  return {
    title: `${post.title} - admitted.fyi`,
  }

  return <div></div>
}
