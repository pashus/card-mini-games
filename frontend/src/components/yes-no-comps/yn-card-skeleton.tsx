import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function YnCardSkeleton() {
  return (
    <Card className="grid h-[420px] w-full max-w-5xl grid-cols-3 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-center pl-8">
        <Skeleton className="h-64 w-64 bg-gray-200" />
      </div>

      <div className="col-span-2 flex flex-col gap-6 p-8">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-7 w-48 bg-gray-200" />
        </div>

        <div className="flex flex-1 items-center rounded-xl bg-white p-6 shadow-xl">
          <div className="w-full space-y-3">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-11/12 bg-gray-200" />
            <Skeleton className="h-4 w-4/5 bg-gray-200" />
          </div>
        </div>

        <div>
          <Skeleton className="h-11 w-56 animate-pulse bg-gray-300" />
        </div>
      </div>
    </Card>
  );
}
