import Link from 'next/link'
import { Chip } from '@nextui-org/react'

import { paths } from '@/lib/paths'
import { db } from '@/lib/db'

const TopicsList = async () => {
  const topics = await db.topic.findMany({
    select: {
      id: true,
      slug: true,
    },
  })

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map(({ id, slug }) => (
        <Link key={id} href={paths.topicShow(slug)}>
          <Chip color="warning" variant="shadow">
            {slug}
          </Chip>
        </Link>
      ))}
    </div>
  )
}

export default TopicsList
