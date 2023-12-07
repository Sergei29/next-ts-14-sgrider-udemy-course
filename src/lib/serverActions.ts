'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { SnippetFormValues } from '@/types'
import { validateSnippetEdit } from '@/lib/common'
import { db } from '@/lib/db'

export const createSnippet = async (formData: FormData) => {
  const title = formData.get('title') as string
  const code = formData.get('code') as string

  if (!title || !code) {
    throw new Error('Form values missing.')
  }

  await db.snippet.create({
    data: {
      title,
      code,
    },
  })

  revalidatePath('/')
  redirect('/')
}

export const updateSnippet = async (
  id: string,
  snippetData: SnippetFormValues,
): Promise<void> => {
  if (!validateSnippetEdit.isValid(snippetData)) {
    throw new Error('Values provided are not valid.')
  }

  const updated = await db.snippet.update({
    where: { id },
    data: {
      ...snippetData,
    },
    select: {
      id: true,
    },
  })

  const snippetPagePath = `/snippets/${updated.id}`

  revalidatePath('/')
  revalidatePath(snippetPagePath)
  redirect(snippetPagePath)
}

export const deleteSnippet = async (id: string) => {
  await db.snippet.delete({ where: { id } })

  revalidatePath('/')
  redirect('/')
}
