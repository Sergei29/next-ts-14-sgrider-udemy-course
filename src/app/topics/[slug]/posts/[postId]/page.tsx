import { IPageProps } from '@/types'

const PostPage = async ({
  params,
  searchParams,
}: IPageProps<{ postId: string }>) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Post show</h1>
    </>
  )
}

export default PostPage
