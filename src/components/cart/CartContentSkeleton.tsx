import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton for cart content only (no Layout). Used in profile layout. */
export default function CartContentSkeleton() {
  return (
    <div className="space-y-6 pt-6">
      <Skeleton className="h-9 w-72" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-4 md:p-6 shadow-soft flex flex-col sm:flex-row gap-4"
            >
              <Skeleton className="w-full sm:w-24 h-32 sm:h-24 rounded-xl shrink-0" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-16" />
                <div className="flex items-center justify-between sm:justify-end gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-5 w-6" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                  <div className="text-right space-y-1">
                    <Skeleton className="h-5 w-14 ml-auto" />
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl p-6 shadow-card sticky top-28 space-y-6">
            <Skeleton className="h-6 w-36" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-14" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-10" />
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
