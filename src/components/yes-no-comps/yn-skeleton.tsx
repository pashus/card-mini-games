import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function YnSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <YnSkeleton key={i} />
      ))}
    </div>
  );
}

export function YnSkeleton() {
  return (
    <Card className="h-100 overflow-hidden py-0">
      <Skeleton className="h-48 w-full bg-gray-200" />

      <div className="space-y-3 p-4 pt-0">
        <Skeleton className="mx-auto h-6 w-2/3 bg-gray-300" />

        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-5/6 bg-gray-200" />
        <Skeleton className="h-4 w-4/6 bg-gray-200" />

        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-12 bg-gray-200" />
          <Skeleton className="h-4 w-14 bg-gray-200" />
          <Skeleton className="h-4 w-12 bg-gray-200" />
        </div>

        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 bg-gray-300" />
          <Skeleton className="h-6 w-20 bg-gray-300" />
        </div>
      </div>
    </Card>
  );
}
