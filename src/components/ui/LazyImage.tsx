import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean; // Set to true for above-the-fold images
  placeholder?: string; // Optional placeholder image URL
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  className = "",
  eager = false,
  placeholder,
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Reset state when src changes
    setIsLoading(true);
    setHasError(false);
    setImageSrc(undefined);

    // Preload image
    const img = new Image();

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      onLoad?.();
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      onError?.();
    };

    img.src = src;
  }, [src, onLoad, onError]);

  // Show placeholder or skeleton while loading
  if (isLoading) {
    return (
      <div
        className={`relative overflow-hidden bg-muted/50 ${className}`}
        style={props.style}
      >
        {placeholder ? (
          <img
            src={placeholder}
            alt=""
            className="w-full h-full object-cover opacity-50 blur-sm"
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {/* Skeleton shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
    );
  }

  // Show error state
  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-muted/30 ${className}`}
        style={props.style}
      >
        <div className="text-center p-4">
          <div className="text-muted-foreground text-sm">
            Failed to load image
          </div>
        </div>
      </div>
    );
  }

  // Render the actual image
  return (
    <img
      src={imageSrc || src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...props}
    />
  );
}
