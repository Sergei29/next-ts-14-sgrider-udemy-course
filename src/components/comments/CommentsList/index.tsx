import CommentShow from '@/components/comments/CommentShow'
import { ICommentWithAuthor } from '@/types'

interface IProps {
  fetchComments: () => Promise<ICommentWithAuthor[]>
}

const CommentsList = async ({ fetchComments }: IProps) => {
  const comments = await fetchComments()

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null,
  )

  /**
   * @description all comments are flattened to one level in the list, some of them are nested one inside another
   * indicated by 'parentId` value pointing to the comment ID.
   */
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
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
