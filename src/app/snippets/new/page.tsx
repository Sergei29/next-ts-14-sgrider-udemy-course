'use client'

import { useFormState } from 'react-dom'

import { createSnippet } from '@/lib/serverActions'
import { IPageProps, IFormState } from '@/types'

const NewSnippetPage = ({}: IPageProps) => {
  const [formState, formAction] = useFormState<IFormState, FormData>(
    createSnippet,
    { message: '' },
  )

  return (
    <form action={formAction} className="max-w-[350px] mx-auto">
      <h3 className="font-bold m-3">Create a snippet</h3>
      <fieldset className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="createTitle" className="w-12">
            Title
          </label>
          <input
            type="text"
            id="createTitle"
            name="title"
            className="border border-gray-400 rounded p-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="createCode">Code</label>
          <textarea
            rows={3}
            id="createCode"
            name="code"
            className="border border-gray-400 rounded p-2 w-full"
          />
        </div>
      </fieldset>
      <button
        type="submit"
        className=" my-4 px-4 py-2 rounded bg-blue-200 w-full"
      >
        Create
      </button>
      <div>
        {formState.message && (
          <p className="my-4 px-4 py-2 bg-red-600 text-white font-semibold text-center">
            {formState.message}
          </p>
        )}
      </div>
    </form>
  )
}

export default NewSnippetPage
