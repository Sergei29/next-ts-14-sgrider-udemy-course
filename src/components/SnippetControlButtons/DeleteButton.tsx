'use client'

import React, { useTransition } from 'react'

import { deleteSnippet } from '@/lib/serverActions'

interface IProps {
  id: string
}

const DeleteButton = ({ id }: IProps): JSX.Element => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(() => {
      deleteSnippet(id)
    })
  }

  return (
    <button
      disabled={isPending}
      onClick={handleDelete}
      className="border border-red-800 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-center px-2 py-1 min-w-[100px] rounded"
    >
      delete
    </button>
  )
}

export default DeleteButton
