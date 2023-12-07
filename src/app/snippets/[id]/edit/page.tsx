import { notFound } from 'next/navigation'

import SnippetEditForm from '@/components/SnippetEditForm'
import { IPageProps } from '@/types'
import { db } from '@/lib/db'

const EditSnippetPage = async ({ params }: IPageProps<{ id: string }>) => {
  const snippetDetails = await db.snippet.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
      code: true,
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

      <SnippetEditForm snippet={snippetDetails} />
    </>
  )
}

export default EditSnippetPage
