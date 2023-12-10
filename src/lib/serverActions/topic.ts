'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { IFormStateCreateTopic } from '@/types'

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
  console.log('create Topic action')
  // todo: revalidate homepage

  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  return {}
}
