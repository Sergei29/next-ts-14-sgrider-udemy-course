'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { IFormStateCreateTopic, ITopic } from '@/types'
import { getErrorMessage } from '@/lib/common'
import { paths } from '@/lib/paths'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export const search = async (formData: FormData) => {
  const term = formData.get('term')
  if (typeof term !== 'string' || !term) {
    return redirect('/')
  }

  redirect(`/search?term=${encodeURIComponent(term)}`)
}
