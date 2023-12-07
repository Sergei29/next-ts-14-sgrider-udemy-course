import { notFound } from 'next/navigation'

import { IPageProps } from '@/types'
import { db } from '@/lib/db'

const EditSnippetPage = async ({ params }: IPageProps<{ id: string }>) => {
  const snippetDetails = await db.snippet.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!snippetDetails) {
    return notFound()
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">
        Edit snippet &rsquo;{snippetDetails.title}&rsquo;
      </h1>
    </>
  )
}

export default EditSnippetPage
