'use server'

import { z } from 'zod'
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

export const createTopic = async (formData: FormData) => {
  console.log('create Topic action')
  // todo: revalidate homepage

  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  })

  if (!result.success) {
    console.log('result.error :>> ', result.error.flatten().fieldErrors)
  }
}
