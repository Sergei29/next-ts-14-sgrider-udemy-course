'use client'

import React, { useState, ChangeEvent } from 'react'
import { Editor, OnChange } from '@monaco-editor/react'

import { updateSnippet } from '@/lib/serverActions'
import { validateSnippetEdit } from '@/lib/common'
import { ISnippet, SnippetFormValues } from '@/types'

interface IProps {
  snippet: Pick<ISnippet, 'id' | 'title' | 'code'>
}

const { hasChanged, isValid } = validateSnippetEdit

const SnippetEditForm = ({ snippet }: IProps): JSX.Element => {
  const [snippetData, setSnippetData] = useState<SnippetFormValues>(() => ({
    title: snippet.title,
    code: snippet.code,
  }))

  const handleEditorChange: OnChange = (value, _event) => {
    value && setSnippetData((current) => ({ ...current, code: value }))
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSnippetData((current) => ({ ...current, title: event.target.value }))
  }

  const handleReset = () => {
    setSnippetData({
      title: snippet.title,
      code: snippet.code,
    })
  }

  /**
   *
   * @description this is an alternative use of server action in client component
   * just by passing it into the click handler function.
   */
  // const handleClick = () => {
  //   // the transition here is used to ensure the updates on DB are happenning before
  //   // we navigate to another page, as what this server action does.
  //   React.startTransition(() => {
  //     updateSnippet(snippet.id, snippetData)
  //   })
  // }

  /**
   *
   * @description this is an alternative use of server action in client component
   * just by passing it into the submit handler function.
   */
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   if (!isValid(snippetData) || !hasChanged(snippetData, snippet)) {
  //     return
  //   }

  //   updateSnippet(snippet.id, snippetData)
  // }

  /**
   * @description in this case we have a server action that
   * is having the parameters `(id: string, snippetData: SnippetFormValues)`, instead of `FormData` as form action defalt
   * so we need to bind these 2 required arguments prior the action function is passed as a `form.action` attribute
   */
  const editSnippetAction = updateSnippet.bind(null, snippet.id, snippetData)

  return (
    <form className="flex flex-col gap-4" action={editSnippetAction}>
      {/* <form className="flex flex-col gap-4" onSubmit={handleSubmit}> */}
      <div className="flex flex-col gap-2">
        <label htmlFor="editTitle" className="w-full font-semibold">
          Title
        </label>
        <input
          type="text"
          id="editTitle"
          name="title"
          value={snippetData.title}
          onChange={handleTitleChange}
          className="px-2 py-1 rounded border border-gray-300"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="w-full font-semibold">
          Code
        </label>
        <Editor
          height="40vh"
          defaultLanguage="javascript"
          value={snippetData.code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
          }}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className=" border border-orange-800 bg-orange-500 hover:bg-orange-600 text-center px-2 py-1 min-w-[100px] rounded"
        >
          update
        </button>
        {/* <button
          type="button"
          onClick={handleClick}
          className=" border border-orange-800 bg-orange-500 hover:bg-orange-600 text-center px-2 py-1 min-w-[100px] rounded"
        >
          update
        </button> */}
        <button
          type="reset"
          onClick={handleReset}
          className="border border-gray-800 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:bg-gray-500/10 hover:disabled:bg-gray-500/10 text-center px-2 py-1 min-w-[100px] rounded"
          disabled={!hasChanged(snippetData, snippet)}
        >
          reset
        </button>
      </div>
    </form>
  )
}

export default SnippetEditForm
