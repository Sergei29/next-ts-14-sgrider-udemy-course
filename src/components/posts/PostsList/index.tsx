import Link from 'next/link'

import { IPost, IUserDb, ITopic } from '@/types'
import { paths } from '@/lib/paths'
import { db } from '@/lib/db'

interface IProps {
  slug: string
}

const PostsList = async ({ slug }: IProps) => {
  const posts = await db.post.findMany({
    where: {
      topic: {
        slug,
      },
    },
    select: {
      id: true,
      title: true,
      user: {
        select: {
          name: true,
        },
      },
      topic: {
        select: {
          slug: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  })

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
