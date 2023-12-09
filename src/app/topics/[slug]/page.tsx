import { IPageProps } from '@/types'

const TopicPage = async ({
  params,
  searchParams,
}: IPageProps<{ slug: string }>) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Topic show</h1>
    </>
  )
}

export default TopicPage
