'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { IFormStateCreateComment, IPost, IUser } from '@/types'
import { getErrorMessage } from '@/lib/common'
import { paths } from '@/lib/paths'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

const createCommentSchema = z.object({
  content: z.string().min(3),
})

interface IPostAndParentIds {
  postId: string
  parentId?: string
}

export const createComment = async (
  { postId, parentId }: IPostAndParentIds,
  formState: IFormStateCreateComment,
  formData: FormData,
): Promise<IFormStateCreateComment> => {
  const session = await auth()

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['To create post, you must sign in first'],
      },
    }
  }

  const result = createCommentSchema.safeParse({
    content: formData.get('content'),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    await db.comment.create({
      data: {
        content: result.data.content,
        postId,
        parentId,
        userId: (session.user as IUser).id,
      },
    })
  } catch (error) {
    return {
      errors: {
        _form: [getErrorMessage(error)],
      },
    }
  }
  const topic = await db.topic.findFirst({
    where: {
      posts: { some: { id: postId } },
    },
  })

  if (!topic) {
    return {
      errors: {
        _form: ['Failed to revalidate topic'],
      },
    }
  }

  // todo: revalidate post show page
  revalidatePath(paths.postShow(topic.slug, postId))

  return {
    success: true,
  }
}
