import { notFound } from 'next/navigation'

import { db } from '@/lib/db'

export { PostShowSkeleton } from './PostShowSkeleton'

interface IProps {
  postId: string
}

const PostShow = async ({ postId }: IProps) => {
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      title: true,
      content: true,
    },
  })

  if (!post) {
    return notFound()
  }
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  )
}

export default PostShow
