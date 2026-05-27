import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function YnCardSkeleton() {
  return (
    <Card className="flex w-full max-w-5xl flex-col overflow-hidden shadow-2xl lg:grid lg:h-[420px] lg:grid-cols-3">
      <div className="flex items-center justify-center px-8 lg:px-0 lg:pl-8">
        <Skeleton className="h-72 w-128 bg-gray-200 lg:h-64 lg:w-64" />
      </div>

      <div className="flex flex-1 flex-col items-center gap-6 p-8 lg:col-span-2 lg:items-stretch">
        <div className="flex flex-col items-center space-y-2 lg:block">
          <Skeleton className="h-4.5 w-24 bg-gray-200" />
          <Skeleton className="h-8 w-48 bg-gray-200" />
        </div>

        <div className="flex h-60 w-full items-center bg-white p-6 shadow-xl lg:h-auto lg:flex-1">
          <div className="w-full space-y-3">
            <Skeleton className="h-4 w-full bg-gray-200 lg:w-full" />
            <Skeleton className="h-4 w-full bg-gray-200 lg:w-11/12" />
            <Skeleton className="h-4 w-full bg-gray-200 lg:w-4/5" />
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <Skeleton className="h-11 bg-gray-300 lg:w-48" />
        </div>
      </div>
    </Card>
  );
}
