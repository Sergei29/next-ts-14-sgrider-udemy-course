import Link from 'next/link'

import CommentCreateForm from '@/components/comments/CommentCreateForm'
import CommentsList from '@/components/comments/CommentsList'
import PostShow from '@/components/posts/PostShow'
import { getCommentsByPostId } from '@/lib/db'
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
      <PostShow postId={params.postId} />
      <CommentCreateForm postId={params.postId} startOpen />
      <CommentsList
        fetchComments={getCommentsByPostId.bind(null, params.postId)}
      />
    </div>
  )
}

export default PostPage
