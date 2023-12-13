import { Skeleton } from '@nextui-org/react'

export const PostsListSkeleton = (): JSX.Element => {
  return (
    <>
      {[1, 2, 3].map((current) => (
        <div
          key={current}
          className="border rounded p-2 flex flex-col gap-2 my-2"
        >
          <Skeleton className="h-[28px] w-[50%] rounded" />
          <Skeleton className="h-[16px] w-[30%] rounded" />
        </div>
      ))}
    </>
  )
}
