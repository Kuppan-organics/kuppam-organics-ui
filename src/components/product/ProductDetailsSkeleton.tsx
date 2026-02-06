export default function ProductDetailsSkeleton() {
  return (
    <>
      {/* Breadcrumb skeleton */}
      <div className="bg-card border-b border-border">
        <div className="container py-4">
          <div className="relative h-5 w-32 bg-muted rounded overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image skeleton */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted/50 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Info panel skeleton */}
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <div className="relative h-9 bg-muted rounded-lg w-4/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="relative h-9 bg-muted/70 rounded-lg w-3/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="relative h-5 w-5 bg-muted rounded overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  ))}
                </div>
                <div className="relative h-5 w-8 bg-muted rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="relative h-4 w-24 bg-muted/70 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <div className="relative h-10 w-28 bg-muted rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="relative h-6 w-20 bg-muted/70 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="relative h-5 w-12 bg-muted/70 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>

              {/* Farming method box */}
              <div className="bg-muted/30 rounded-xl p-4 border border-border/50 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative h-5 w-5 bg-muted rounded overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                  <div className="relative h-5 w-32 bg-muted rounded overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
                <div className="relative h-4 w-full bg-muted/70 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="relative h-4 w-5/6 bg-muted/70 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>

              {/* Nutritional benefits */}
              <div className="space-y-3">
                <div className="relative h-5 w-40 bg-muted rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="relative h-8 w-24 bg-muted rounded-full overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <div className="relative h-4 w-20 bg-muted/70 rounded overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <div className="relative h-10 w-10 bg-muted overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                  <div className="relative w-12 h-10 bg-muted/70 overflow-hidden" />
                  <div className="relative h-10 w-10 bg-muted overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <div className="relative h-14 w-full bg-muted rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="relative h-14 w-full bg-muted rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>

              {/* Footer info */}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="relative h-5 w-5 bg-muted rounded overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                  <div className="relative h-4 w-48 bg-muted/70 rounded overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative h-5 w-5 bg-muted rounded overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                  <div className="relative h-4 w-40 bg-muted/70 rounded overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description section skeleton */}
          <div className="mt-12 pt-8 border-t border-border space-y-4">
            <div className="relative h-8 w-48 bg-muted rounded overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
            <div className="space-y-2 max-w-3xl">
              <div className="relative h-4 w-full bg-muted/70 rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
              <div className="relative h-4 w-full bg-muted/70 rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
              <div className="relative h-4 w-4/5 bg-muted/70 rounded overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
