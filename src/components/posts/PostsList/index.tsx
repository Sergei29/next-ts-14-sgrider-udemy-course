import Link from 'next/link'

import { IPostWithDetails } from '@/types'
import { paths } from '@/lib/paths'

export { PostsListSkeleton } from './PostsListSkeleton'

interface IProps {
  fetchPosts: () => Promise<IPostWithDetails[]>
}

const PostsList = async ({ fetchPosts }: IProps) => {
  const posts = await fetchPosts()

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post')
    }

    return (
      <div key={post.id} className="border rounded p-2">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    )
  })

  return <div className="space-y-2">{renderedPosts}</div>
}

export default PostsList
