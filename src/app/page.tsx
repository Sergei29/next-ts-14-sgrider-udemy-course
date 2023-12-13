import { Divider } from '@nextui-org/react'
import { Suspense } from 'react'

import PostsList, { PostsListSkeleton } from '@/components/posts/PostsList'
import TopicCreateForm from '@/components/topics/TopicCreateForm'
import TopicsList from '@/components/topics/TopicsList'
import { getTopPosts } from '@/lib/db'

export const revalidate = 600

const HomePage = async () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className=" col-span-3">
        <h1 className="text-xl m-2">Top posts</h1>
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsList fetchPosts={getTopPosts} />
        </Suspense>
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm />
        <Divider className="my-2" />
        <h3 className="text-lg">Topics</h3>
        <TopicsList />
      </div>
    </div>
  )
}

export default HomePage
