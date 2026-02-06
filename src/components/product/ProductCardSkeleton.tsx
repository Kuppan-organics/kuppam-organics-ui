export default function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border/30">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/50">
        <div className="w-full h-full bg-gradient-to-r from-muted via-muted/50 to-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <div className="relative h-5 bg-muted rounded-md w-3/4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2">
          <div className="relative h-3 bg-muted/70 rounded w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          <div className="relative h-3 bg-muted/70 rounded w-5/6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Price and Weight Skeleton */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <div className="relative h-6 bg-muted rounded w-16 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
            <div className="relative h-4 bg-muted/70 rounded w-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="relative h-4 bg-muted/70 rounded w-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex gap-2 mt-3">
          <div className="relative flex-1 h-8 bg-muted rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          <div className="relative flex-1 h-8 bg-muted rounded-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
