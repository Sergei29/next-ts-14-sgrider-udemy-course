'use client'

import React from 'react'

interface IProps {
  error: Error
  reset: () => void
}

const CreateErrorPage = ({ error, reset }: IProps): JSX.Element => {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-bold underline"> 😜 Oups ! 💥 An error!</h1>
      {error.message && (
        <div className="p-2 bg-red-500 border border-red-700 rounded text-center font-semibold text-white">
          <p>{error.message}</p>
        </div>
      )}
      <button
        onClick={() => reset()}
        className="border border-gray-500 bg-gray-300 hover:bg-gray-400 text-red-800 px-2 py-1 min-w-[100px] rounded font-semibold"
      >
        reset
      </button>
    </div>
  )
}

export default CreateErrorPage
