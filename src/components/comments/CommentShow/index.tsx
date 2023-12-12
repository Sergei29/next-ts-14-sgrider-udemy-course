import Image from 'next/image'

import CommentCreateForm from '@/components/comments/CommentCreateForm'
import { ICommentWithAuthor } from '@/types'

interface IProps {
  commentId: string
  comments: ICommentWithAuthor[]
}

const CommentShow = ({ commentId, comments }: IProps) => {
  const comment = comments.find((current) => current.id === commentId)

  if (!comment) {
    return null
  }

  /**
   * @description all comments are flattened to one level in the list, some of them are nested one inside another
   * indicated by 'parentId` value pointing to the comment ID. So here we select all
   * comments immediate children to this current comment.
   * then recurse to next level deep
   */
  const children = comments.filter((current) => current.parentId === commentId)

  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} comments={comments} />
    )
  })

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ''}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  )
}

export default CommentShow
