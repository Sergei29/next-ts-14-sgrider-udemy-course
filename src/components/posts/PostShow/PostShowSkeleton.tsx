import { Skeleton } from '@nextui-org/react'

export const PostShowSkeleton = (): JSX.Element => {
  return (
    <div className="m-4 rounded">
      <Skeleton className="text-2xl font-bold my-2 h-[32px] w-[50vw] rounded" />

      <div className="p-4 border rounded h-[58px] flex items-center">
        <Skeleton className="h-[30px] w-[50vw] rounded" />
      </div>
    </div>
  )
}
