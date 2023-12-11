import { Divider } from '@nextui-org/react'

import PostCreateForm from '@/components/posts/PostCreateForm'

import { IPageProps } from '@/types'

const TopicPage = async ({ params }: IPageProps<{ slug: string }>) => {
  return (
    <div className="grid grid-cols-4 p-4 gap-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{params.slug}</h1>
      </div>
      <div className="">
        <PostCreateForm slug={params.slug} />
        <Divider className="my-2" />
        <div>description...</div>
      </div>
    </div>
  )
}

export default TopicPage
