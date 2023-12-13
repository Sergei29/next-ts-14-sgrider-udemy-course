import { Skeleton } from '@nextui-org/react'

export const CommentsListSkeleton = (): JSX.Element => {
  return (
    <div className="space-y-3">
      <Skeleton className="rounded h-[28px] w-[200px]" />

      <div className="p-4 border mt-2 mb-1">
        <div className="flex gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="rounded w-[50px] h-[20px]" />
            <Skeleton className="h-[48px] rounded" />
            <Skeleton className="w-[64px] h-[32px] rounded" />
          </div>
        </div>
        <div className="pl-4">
          <div className="p-4 border mt-2 mb-1">
            <div className="flex gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="rounded w-[50px] h-[20px]" />
                <Skeleton className="h-[48px] rounded" />
                <Skeleton className="w-[64px] h-[32px] rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
