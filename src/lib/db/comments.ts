import { ICommentWithAuthor } from '@/types'
import { db } from '.'

export const getCommentsByPostId = (
  postId: string,
): Promise<ICommentWithAuthor[]> =>
  db.comment.findMany({
    where: {
      postId,
    },
    select: {
      id: true,
      content: true,
      postId: true,
      parentId: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  })
