import { notFound } from 'next/navigation'
import SnippetControlButtons from '@/components/SnippetControlButtons'
import { IPageProps } from '@/types'
import { db } from '@/lib/db'

const SnippetPage = async ({ params }: IPageProps<{ id: string }>) => {
  const snippetDetails = await db.snippet.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!snippetDetails) {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mt-4">
        <h1 className="font-semibold text-3xl capitalize">
          {snippetDetails.title}
        </h1>
        <div className="flex gap-2 items-center">
          <SnippetControlButtons id={params.id} />
        </div>
      </div>
      <pre className="bg-gray-300 rounded p-2 min-h-[30vh] flex justify-center items-center">
        <code>{snippetDetails.code}</code>
      </pre>
    </div>
  )
}

export default SnippetPage
