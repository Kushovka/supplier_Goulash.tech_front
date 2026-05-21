const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-stone-200 ${className}`} />
)

export const EquipmentCardSkeleton = () => (
  <div className="overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm">
    <Skeleton className="aspect-[4/3] w-full rounded-none" />
    <div className="space-y-5 p-6">
      <div className="flex justify-between gap-5">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-6 w-3/5" />
        </div>
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <Skeleton className="h-11 w-full" />
    </div>
  </div>
)

export const CarouselSkeleton = () => (
  <div className="mt-10">
    <div className="mb-5 flex items-center justify-between">
      <Skeleton className="h-4 w-28" />
      <div className="flex gap-2">
        <Skeleton className="h-11 w-11" />
        <Skeleton className="h-11 w-11" />
      </div>
    </div>
    <div className="grid min-h-[320px] overflow-hidden rounded-md border border-stone-200 bg-stone-50 md:h-[360px] md:grid-cols-[minmax(400px,1.05fr)_minmax(380px,.95fr)]">
      <Skeleton className="h-56 rounded-none md:h-full" />
      <div className="space-y-4 p-6">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-8 w-3/5" />
        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  </div>
)

export const DetailSkeleton = () => (
  <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <Skeleton className="h-5 w-36" />
    <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
      <div>
        <Skeleton className="h-[360px] w-full sm:h-[500px]" />
        <div className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-4 h-10 w-3/4" />
          <Skeleton className="mt-4 h-5 w-full" />
          <Skeleton className="mt-3 h-5 w-2/3" />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-28" />
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-8 w-3/4" />
        <Skeleton className="mt-6 h-12 w-full" />
        <Skeleton className="mt-4 h-12 w-full" />
        <Skeleton className="mt-4 h-12 w-full" />
        <Skeleton className="mt-4 h-28 w-full" />
        <Skeleton className="mt-4 h-12 w-full" />
      </div>
    </div>
  </section>
)

export default Skeleton
