import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function YnSkeletonGrid() {
  return (
    <div className="mt-4 grid w-full grid-cols-1 gap-6 rounded-lg bg-[#fff7f09e] p-6 shadow sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <YnSkeleton key={i} />
      ))}
    </div>
  );
}

export function YnSkeleton() {
  return (
    <Card className="h-100 w-full overflow-hidden py-0">
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

export function YnSkeletonTable() {
  return (
    <div className="mt-4 rounded-lg bg-[#fff7f09e] p-4 shadow sm:p-6">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 8 }).map((_, index) => <TableHead key={index}><Skeleton className="h-4 w-16 bg-gray-300" /></TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton className="size-12 bg-gray-200" /></TableCell>
              <TableCell><Skeleton className="h-4 w-32 bg-gray-200" /></TableCell>
              <TableCell><Skeleton className="h-4 w-56 bg-gray-200" /></TableCell>
              <TableCell><Skeleton className="h-6 w-24 bg-gray-200" /></TableCell>
              <TableCell><Skeleton className="h-4 w-10 bg-gray-200" /></TableCell>
              <TableCell><Skeleton className="h-4 w-10 bg-gray-200" /></TableCell>
              <TableCell><Skeleton className="h-4 w-10 bg-gray-200" /></TableCell>
              <TableCell><Skeleton className="h-8 w-16 bg-gray-200" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
