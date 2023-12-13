import CommentShow from '@/components/comments/CommentShow'
import { getCommentsByPostId } from '@/lib/db'

interface IProps {
  postId: string
}

const CommentsList = async ({ postId }: IProps) => {
  const comments = await getCommentsByPostId(postId)

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null,
  )

  /**
   * @description all comments are flattened to one level in the list, some of them are nested one inside another
   * indicated by 'parentId` value pointing to the comment ID.
   */
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow key={comment.id} commentId={comment.id} postId={postId} />
    )
  })

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  )
}

export default CommentsList
