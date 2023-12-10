'use server'

import { db } from '@/lib/db'

export const createTopic = async (formData: FormData) => {
  console.log('create Topic action')
  // todo: revalidate homepage

  const slug = formData.get('name')
  const description = formData.get('description')

  console.log('form values: ', { slug, description })
}
