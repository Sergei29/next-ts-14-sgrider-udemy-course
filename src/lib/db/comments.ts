import { cache } from 'react'

import { ICommentWithAuthor } from '@/types'
import { db } from '.'

export const getCommentsByPostId = cache(
  (postId: string): Promise<ICommentWithAuthor[]> => {
    return db.comment.findMany({
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
  },
)
