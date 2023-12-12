import Link from 'next/link'
import { notFound } from 'next/navigation'

import CommentCreateForm from '@/components/comments/CommentCreateForm'
import CommentsList from '@/components/comments/CommentsList'
import PostShow from '@/components/posts/PostShow'
import { IPageProps } from '@/types'
import { paths } from '@/lib/paths'
import { db } from '@/lib/db'

const PostPage = async ({
  params,
}: IPageProps<{ postId: string; slug: string }>) => {
  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
    select: {
      title: true,
      content: true,
      comments: {
        select: {
          id: true,
          postId: true,
          parentId: true,
          content: true,
          user: {
            select: {
              image: true,
              name: true,
            },
          },
        },
      },
    },
  })

  if (!post) {
    return notFound()
  }

  return (
    <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.topicShow(params.slug)}
      >
        {'< '}Back to {params.slug}
      </Link>
      <PostShow post={post} />
      <CommentCreateForm postId={params.postId} startOpen />
      <CommentsList comments={post.comments} />
    </div>
  )
}

export default PostPage
