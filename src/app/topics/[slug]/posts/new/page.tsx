import { IPageProps } from '@/types'

const NewPostPage = async ({
  params,
  searchParams,
}: IPageProps<{ slug: string }>) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Post create</h1>
    </>
  )
}

export default NewPostPage
