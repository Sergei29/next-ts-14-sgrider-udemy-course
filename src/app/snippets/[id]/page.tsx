import { db } from '@/lib/db'
import { IPageProps } from '@/types'
import SnippetControlButtons from '@/components/SnippetControlButtons'

const SnippetPage = async ({ params }: IPageProps<{ id: string }>) => {
  const snippetDetails = await db.snippet.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!snippetDetails) {
    return <p className="mt-8">Not found</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mt-4">
        <h1 className="font-semibold text-3xl capitalize">
          {snippetDetails.title}
        </h1>
        <div className="flex gap-2 items-center">
          <SnippetControlButtons />
        </div>
      </div>
      <code className="bg-gray-300 rounded p-2 min-h-[30vh] flex justify-center items-center">
        {snippetDetails.code}
      </code>
    </div>
  )
}

export default SnippetPage
