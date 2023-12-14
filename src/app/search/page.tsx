import { redirect } from 'next/navigation'

import PostsList from '@/components/posts/PostsList'
import { getPostsBySearchTerm } from '@/lib/db'
import { IPageProps } from '@/types'

const Page = async ({ searchParams }: IPageProps<{}, { term: string }>) => {
  if (!searchParams.term) {
    redirect('/')
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Search</h1>
      <p>search results by &rsquo;{searchParams.term}&rsquo;</p>
      <PostsList
        fetchPosts={getPostsBySearchTerm.bind(
          null,
          searchParams.term.toLowerCase(),
        )}
      />
    </>
  )
}

export default Page
