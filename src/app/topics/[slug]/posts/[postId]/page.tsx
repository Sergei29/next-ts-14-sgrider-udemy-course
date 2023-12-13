import { Suspense } from 'react'
import Link from 'next/link'

import CommentsList, {
  CommentsListSkeleton,
} from '@/components/comments/CommentsList'
import PostShow, { PostShowSkeleton } from '@/components/posts/PostShow'
import CommentCreateForm from '@/components/comments/CommentCreateForm'
import { paths } from '@/lib/paths'
import { IPageProps } from '@/types'

const PostPage = async ({
  params,
}: IPageProps<{ postId: string; slug: string }>) => {
  return (
    <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.topicShow(params.slug)}
      >
        {'< '}Back to {params.slug}
      </Link>
      <Suspense fallback={<PostShowSkeleton />}>
        <PostShow postId={params.postId} />
      </Suspense>
      <CommentCreateForm postId={params.postId} startOpen />
      <Suspense fallback={<CommentsListSkeleton />}>
        <CommentsList postId={params.postId} />
      </Suspense>
    </div>
  )
}

export default PostPage
