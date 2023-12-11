'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { IFormStateCreateTopic, ITopic } from '@/types'
import { getErrorMessage } from '@/lib/common'
import { paths } from '@/lib/paths'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters or dashes without spaces',
    }),
  description: z
    .string()
    .min(10, { message: 'Must be at least 10 characters long' }),
})

export const createTopic = async (
  formState: IFormStateCreateTopic,
  formData: FormData,
): Promise<IFormStateCreateTopic> => {
  const session = await auth()

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['To create topic, you must sign in first'],
      },
    }
  }

  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  let topic: ITopic | null = null

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    })
  } catch (error) {
    return {
      errors: {
        _form: [getErrorMessage(error)],
      },
    }
  }

  revalidatePath('/')
  redirect(paths.topicShow(topic.slug))
}
