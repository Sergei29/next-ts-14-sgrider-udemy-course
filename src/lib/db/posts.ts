import { IPostWithDetails } from '@/types'
import { db } from '.'

const SELECT_FIELDS = {
  id: true,
  title: true,
  user: {
    select: {
      name: true,
      image: true,
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
} as const

export const getPostsByTopicSlug = (
  slug: string,
): Promise<IPostWithDetails[]> =>
  db.post.findMany({
    where: {
      topic: {
        slug,
      },
    },
    select: {
      ...SELECT_FIELDS,
    },
  })

/**
 * @description another alternative make type definition of this post type
 * 1. it specifies the awaited type `Awaited<My-promise-resolve-type>`
 * 2. of the return type of a given function `ReturnType<typeof getPostsByTopicSlug>`
 * 3. and out of array - takes just one element type `[number]`
 */
type PostWithDetails = Awaited<ReturnType<typeof getPostsByTopicSlug>>[number]

export const getTopPosts = (): Promise<IPostWithDetails[]> =>
  db.post.findMany({
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    take: 3,
    select: {
      ...SELECT_FIELDS,
    },
  })

export const getPostsBySearchTerm = (
  term: string,
): Promise<IPostWithDetails[]> => {
  const keywords = term.split(' ')

  return db.post.findMany({
    where: {
      OR: [
        {
          content: {
            contains: term,
          },
        },
        {
          content: {
            contains: keywords[0],
          },
        },
        {
          title: {
            contains: term,
          },
        },
        {
          title: {
            contains: keywords[0],
          },
        },
        {
          title: {
            in: keywords,
          },
        },
        {
          topic: {
            slug: {
              in: keywords,
            },
          },
        },
      ],
    },
    select: {
      ...SELECT_FIELDS,
    },
  })
}
