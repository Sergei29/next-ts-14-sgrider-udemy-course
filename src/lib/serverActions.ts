'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { SnippetFormValues, IFormState } from '@/types'
import { validateSnippetEdit, getErrorMessage } from '@/lib/common'
import { db } from '@/lib/db'

export const createSnippet = async (
  formState: IFormState,
  formData: FormData,
) => {
  try {
    const title = formData.get('title') as string
    const code = formData.get('code') as string

    if (!title || !code) {
      throw new Error('Form values missing')
    }

    if (title.length < 3) {
      throw new Error('Title must at least 3 characters long')
    }

    await db.snippet.create({
      data: {
        title,
        code,
      },
    })
  } catch (error) {
    return { message: getErrorMessage(error) }
  }

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
