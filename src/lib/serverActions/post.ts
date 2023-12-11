'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { IFormStateCreatePost, IPost, IUser } from '@/types'
import { getErrorMessage } from '@/lib/common'
import { paths } from '@/lib/paths'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
})

export const createPost = async (
  slug: string,
  formState: IFormStateCreatePost,
  formData: FormData,
): Promise<IFormStateCreatePost> => {
  const session = await auth()

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['To create post, you must sign in first'],
      },
    }
  }

  if (!slug) {
    return {
      errors: {
        _form: ['Topic not found'],
      },
    }
  }

  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  const topic = await db.topic.findUnique({
    where: { slug },
    select: { id: true },
  })
  if (!topic) {
    return {
      errors: {
        _form: ['No topic related found'],
      },
    }
  }

  let post: Pick<IPost, 'id'>

  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: (session.user as IUser).id,
        topicId: topic.id,
      },
      select: {
        id: true,
      },
    })
  } catch (error) {
    return {
      errors: {
        _form: [getErrorMessage(error)],
      },
    }
  }

  revalidatePath(paths.topicShow(slug))
  redirect(paths.postShow(slug, post.id))
}
