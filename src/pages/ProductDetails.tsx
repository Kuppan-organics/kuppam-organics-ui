import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Leaf,
  Truck,
  Shield,
  Star,
  Check,
  MessageSquare,
  Pencil,
  Trash2,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ProductCard from "@/components/product/ProductCard";
import ProductDetailsSkeleton from "@/components/product/ProductDetailsSkeleton";
import LazyImage from "@/components/ui/LazyImage";
import {
  useGetApiProductsId,
  useGetApiProducts,
} from "@/api/generated/products/products";
import {
  useGetApiReviewsProductProductId,
  usePostApiReviews,
  usePutApiReviewsId,
  useDeleteApiReviewsId,
  getGetApiReviewsProductProductIdQueryKey,
} from "@/api/generated/reviews/reviews";
import { useGetApiAuthProfile } from "@/api/generated/authentication/authentication";
import { queryConfig } from "@/lib/queryConfig";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import type { Product as ApiProduct } from "@/api/generated/models";
import type { Product } from "@/lib/types";

const MAX_REVIEW_LENGTH = 200;

// Helper function to map API product to local Product type
const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
  return {
    id: apiProduct.id || "",
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.discountedPrice || apiProduct.price,
    originalPrice: apiProduct.discountedPrice ? apiProduct.price : undefined,
    image: apiProduct.images?.[0] || "/placeholder.svg",
    category: apiProduct.category?.toLowerCase() || "uncategorized",
    weight: "1 kg", // Default weight
    inStock: (apiProduct as any).isActive === true || (apiProduct.stock || 0) > 0,
  };
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState("");
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  // Current user email (for showing edit/delete on own reviews)
  const { data: profileData } = useGetApiAuthProfile({
    query: { enabled: !!token },
  });
  const currentUserEmail = profileData?.user?.email ?? null;

  // Fetch product details with optimized caching
  const {
    data: productData,
    isLoading,
    error,
  } = useGetApiProductsId(id || "", {
    query: {
      enabled: !!id,
      ...queryConfig.productDetails,
    },
  });

  // Fetch related products with caching
  const { data: relatedProductsData } = useGetApiProducts(
    {
      category: productData?.product?.category,
    },
    {
      query: {
        ...queryConfig.products,
        enabled: !!productData?.product?.category,
      },
    },
  );

  // Fetch reviews for this product (only after product has loaded)
  const { data: reviewsData } = useGetApiReviewsProductProductId(id || "", {
    query: {
      enabled: !!id && !!productData?.product,
      ...queryConfig.productDetails,
    },
  });

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  // Auto-advance carousel every 5s when product has multiple images
  useEffect(() => {
    if (!productData?.product) return;
    const images = productData.product.images?.filter(Boolean) ?? [];
    const urls =
      images.length > 0
        ? images
        : [productData.product.images?.[0] || "/placeholder.svg"];
    if (urls.length <= 1) return;
    const interval = setInterval(() => {
      setSelectedImageIndex((i) => (i + 1) % urls.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [id, productData?.product?.images]);

  // Post review (logged-in users only)
  const postReviewMutation = usePostApiReviews({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetApiReviewsProductProductIdQueryKey(id || ""),
        });
        setReviewComment("");
        toast({
          title: "Review posted",
          description: "Thank you for your review!",
        });
      },
      onError: () => {
        toast({
          title: "Could not post review",
          description: "Please try again or log in if needed.",
          variant: "destructive",
        });
      },
    },
  });

  const handleSubmitReview = () => {
    const trimmed = reviewComment.trim();
    if (!id || !trimmed) return;
    if (trimmed.length > MAX_REVIEW_LENGTH) {
      toast({
        title: "Review too long",
        description: `Please keep your review to ${MAX_REVIEW_LENGTH} characters or less.`,
        variant: "destructive",
      });
      return;
    }
    postReviewMutation.mutate({
      data: { productId: id, comment: trimmed },
    });
  };

  const invalidateReviews = () => {
    queryClient.invalidateQueries({
      queryKey: getGetApiReviewsProductProductIdQueryKey(id || ""),
    });
  };

  const putReviewMutation = usePutApiReviewsId({
    mutation: {
      onSuccess: () => {
        invalidateReviews();
        setEditingReviewId(null);
        setEditingComment("");
        toast({
          title: "Review updated",
          description: "Your review has been updated.",
        });
      },
      onError: () => {
        toast({
          title: "Could not update review",
          description: "Please try again.",
          variant: "destructive",
        });
      },
    },
  });

  const deleteReviewMutation = useDeleteApiReviewsId({
    mutation: {
      onSuccess: () => {
        invalidateReviews();
        setDeleteReviewId(null);
        toast({
          title: "Review deleted",
          description: "Your review has been removed.",
        });
      },
      onError: () => {
        toast({
          title: "Could not delete review",
          description: "Please try again.",
          variant: "destructive",
        });
      },
    },
  });

  const handleStartEdit = (review: { _id?: string; comment?: string }) => {
    if (review._id) {
      setEditingReviewId(review._id);
      setEditingComment(review.comment ?? "");
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditingComment("");
  };

  const handleSaveEdit = () => {
    const trimmed = editingComment.trim();
    if (!editingReviewId || trimmed.length > MAX_REVIEW_LENGTH) {
      if (trimmed.length > MAX_REVIEW_LENGTH) {
        toast({
          title: "Review too long",
          description: `Keep your review to ${MAX_REVIEW_LENGTH} characters or less.`,
          variant: "destructive",
        });
      }
      return;
    }
    putReviewMutation.mutate({
      id: editingReviewId,
      data: { comment: trimmed },
    });
  };

  const handleConfirmDelete = () => {
    if (deleteReviewId) {
      deleteReviewMutation.mutate({ id: deleteReviewId });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <ProductDetailsSkeleton />
      </Layout>
    );
  }

  // Extract product from the API response
  const apiProduct = productData?.product;

  if (!productData || !apiProduct) {
    return (
      <Layout>
        <div className="container pb-20 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">
            Product not found
          </h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const product = mapApiProductToProduct(apiProduct);
  const relatedProducts = relatedProductsData?.products
    ? relatedProductsData.products
        .filter((p) => p.category === apiProduct.category && p.id !== id)
        .slice(0, 4)
        .map(mapApiProductToProduct)
    : [];

  // Calculate discount percentage
  const discountPercentage =
    apiProduct.discount ||
    (product.originalPrice && product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0);

  // Normalized image list (at least one URL for main display)
  const rawImages = (apiProduct.images ?? []).filter((u): u is string =>
    Boolean(u),
  );
  const imageUrls =
    rawImages.length > 0
      ? rawImages
      : [apiProduct.images?.[0] || product.image];
  const hasMultipleImages = imageUrls.length > 1;

  // Rating and review count from reviews API (Review model has no rating field)
  const reviews = reviewsData?.reviews ?? [];
  const reviewCount = reviewsData?.count ?? reviews.length;
  const rating = 0; // API doesn't provide per-review rating; kept for optional future use

  // Get nutritional benefits from API or fallback to defaults
  const nutritionalBenefits =
    apiProduct.nutritionalBenefits && apiProduct.nutritionalBenefits.length > 0
      ? apiProduct.nutritionalBenefits
      : ["Rich in Vitamin C", "High in Lycopene", "Low Calories"];

  // Get farming methods from API
  const farmingMethods =
    apiProduct.framingMethods && apiProduct.framingMethods.length > 0
      ? apiProduct.framingMethods
      : null;

  // Get current price based on selected variant
  const currentVariant = selectedVariant
    ? apiProduct.variants?.find(
        (v) => v.id === selectedVariant || v._id === selectedVariant,
      )
    : null;

  const displayPrice = currentVariant
    ? currentVariant.price
    : apiProduct.discountedPrice || apiProduct.price;
  const displayOriginalPrice =
    currentVariant && currentVariant.discount && currentVariant.discount > 0
      ? currentVariant.price / (1 - currentVariant.discount / 100)
      : apiProduct.discountedPrice
        ? apiProduct.price
        : undefined;
  const displayQuantity = currentVariant
    ? currentVariant.quantity
    : apiProduct.quantity || "1 kg";
  const displayStock = currentVariant ? currentVariant.stock : apiProduct.stock;
  const isInStock = (displayStock || 0) > 0;

  const handleAddToCart = () => {
    // Create a product object with the currently selected variant's price
    const productToAdd = {
      ...product,
      price: displayPrice,
      originalPrice: displayOriginalPrice,
      weight: displayQuantity,
    };
    addItem(productToAdd, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} (${displayQuantity}) added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    // Check if user is logged in
    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with buy now.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: `/product/${id}`, buyNow: true } });
      return;
    }

    // Validate product ID
    if (!id) {
      toast({
        title: "Error",
        description: "Product ID is missing.",
        variant: "destructive",
      });
      return;
    }

    // Navigate to checkout with buy now info
    // The checkout page will handle calling the buy now API after collecting shipping address
    navigate("/checkout", {
      state: {
        buyNow: true,
        productId: id,
        quantity: quantity,
        product: {
          id: product.id,
          name: product.name,
          price: displayPrice,
          image: product.image,
          weight: displayQuantity,
        },
      },
    });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container py-4">
          <Link
            to="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Panel: main image + optional thumbnail sidebar when multiple images */}
            <div className="relative flex gap-3">
              {hasMultipleImages && (
                <div className="hidden sm:flex flex-col gap-2 shrink-0 w-16 lg:w-20">
                  {imageUrls.map((url, index) => (
                    <button
                      key={`${url}-${index}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        selectedImageIndex === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-transparent hover:border-muted-foreground/30"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <LazyImage
                        src={url}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
              <div className="relative flex-1 min-w-0">
                <div className="aspect-square rounded-2xl overflow-hidden bg-muted/30 shadow-card relative">
                  <LazyImage
                    src={imageUrls[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    eager={true}
                  />
                  {/* Labels */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <span className="px-3 py-1 rounded-full bg-[#90EE90]/80 text-[#2d5016] text-xs font-semibold">
                      Farm Fresh
                    </span>
                    {discountPercentage > 0 && (
                      <span className="px-3 py-1 rounded-full bg-orange-400 text-white text-xs font-semibold">
                        -{discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info Panel */}
            <div className="space-y-6">
              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>

              {/* Rating & Reviews count */}
              <div className="flex items-center gap-2">
                {rating > 0 ? (
                  <>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : i < rating
                                ? "fill-yellow-400/50 text-yellow-400"
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-foreground font-medium">
                      {rating}
                    </span>
                  </>
                ) : null}
                <span className="text-muted-foreground">
                  {reviewCount === 0
                    ? "No reviews yet"
                    : `(${reviewCount} review${reviewCount === 1 ? "" : "s"})`}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-4xl font-bold text-foreground">
                  ₹{(Math.round(displayPrice * 10) / 10).toFixed(1)}
                </span>
                {displayOriginalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{(Math.round(displayOriginalPrice * 10) / 10).toFixed(1)}
                  </span>
                )}
                <span className="text-muted-foreground text-lg">
                  /{displayQuantity}
                </span>
              </div>

              {/* Variants Selector */}
              {apiProduct.variants && apiProduct.variants.length > 0 && (
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {/* Default quantity option */}
                    <button
                      onClick={() => setSelectedVariant(null)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedVariant === null
                          ? "border-primary bg-primary/10 text-primary font-semibold"
                          : "border-border hover:border-primary/50 text-foreground"
                      }`}
                    >
                      <div className="text-sm">
                        {apiProduct.quantity || "Default"}
                      </div>
                      <div className="text-xs font-semibold">
                        ₹{apiProduct.discountedPrice || apiProduct.price}
                      </div>
                    </button>
                    {apiProduct.variants.map((variant) => (
                      <button
                        key={variant.id || variant._id}
                        onClick={() =>
                          setSelectedVariant(variant.id || variant._id || null)
                        }
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedVariant === (variant.id || variant._id)
                            ? "border-primary bg-primary/10 text-primary font-semibold"
                            : "border-border hover:border-primary/50 text-foreground"
                        } ${(variant.stock || 0) === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={(variant.stock || 0) === 0}
                      >
                        <div className="text-sm">{variant.quantity}</div>
                        <div className="text-xs font-semibold">
                          ₹{variant.price}
                        </div>
                        {(variant.stock || 0) === 0 && (
                          <div className="text-xs text-destructive">
                            Out of stock
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Farming Methods */}
              {farmingMethods && farmingMethods.length > 0 && (
                <div className="bg-[#E8F5E9] rounded-xl p-4 border border-[#C8E6C9]">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-5 w-5 text-[#4CAF50]" />
                    <h3 className="font-heading font-semibold text-foreground">
                      Farming Methods
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {farmingMethods.map((method, index) => (
                      <span
                        key={index}
                        className="text-sm text-foreground/80 bg-white/60 px-3 py-1 rounded-full"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutritional Benefits */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-3">
                  Nutritional Benefits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {nutritionalBenefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-foreground text-sm"
                    >
                      <Check className="h-4 w-4 text-[#4CAF50]" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Quantity:
                </span>
                <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-lg border-x border-border py-2">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stock Status */}
              {!isInStock && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-destructive text-sm font-medium">
                    Out of Stock
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold w-full py-6 text-lg rounded-xl"
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {isInStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full py-6 text-lg rounded-xl"
                  onClick={handleBuyNow}
                  disabled={!isInStock}
                >
                  {isInStock ? "Buy Now" : "Out of Stock"}
                </Button>
              </div>

              {/* Footer Info */}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Truck className="h-5 w-5 text-[#4CAF50]" />
                  <span>Free delivery above ₹500</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Shield className="h-5 w-5 text-[#4CAF50]" />
                  <span>100% Organic Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section (Below buttons) */}
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Product Description
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {product.description}
            </p>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Customer Reviews
            </h2>

            {/* Write a review (logged-in users only) */}
            {token && (
              <div className="mb-8 max-w-3xl rounded-2xl border border-[#E8E0D5] bg-[#F8F5F0] p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8E0D5]">
                    <MessageSquare className="h-4 w-4 text-foreground/70" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">
                      Write a review
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Share your experience with this product
                    </p>
                  </div>
                </div>
                <Textarea
                  placeholder="What did you think? E.g. taste, quality, delivery..."
                  value={reviewComment}
                  onChange={(e) =>
                    setReviewComment(e.target.value.slice(0, MAX_REVIEW_LENGTH))
                  }
                  maxLength={MAX_REVIEW_LENGTH}
                  className="min-h-[120px] resize-none rounded-xl border-[#E8E0D5] bg-background/80 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-[#C8B8A8]"
                  disabled={postReviewMutation.isPending}
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`text-xs ${
                      reviewComment.length >= MAX_REVIEW_LENGTH
                        ? "text-amber-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {reviewComment.length}/{MAX_REVIEW_LENGTH} characters
                  </span>
                  <Button
                    size="default"
                    onClick={handleSubmitReview}
                    disabled={
                      !reviewComment.trim() || postReviewMutation.isPending
                    }
                    className="rounded-xl bg-[#6B5344] hover:bg-[#5A4538] text-white font-medium px-5"
                  >
                    {postReviewMutation.isPending
                      ? "Posting..."
                      : "Post review"}
                  </Button>
                </div>
              </div>
            )}

            {!token && (
              <p className="text-muted-foreground mb-4">
                <Link to="/login" className="text-primary hover:underline">
                  Log in
                </Link>{" "}
                to write a review.
              </p>
            )}

            {reviews.length === 0 ? (
              <div className="max-w-3xl rounded-2xl border border-[#E8E0D5] bg-[#F8F5F0]/60 p-6 text-center">
                <p className="text-muted-foreground">
                  No reviews yet.
                  {token
                    ? " Be the first to review this product!"
                    : " Be the first to review after logging in."}
                </p>
              </div>
            ) : (
              <div className="max-w-3xl space-y-4">
                <p className="text-sm text-muted-foreground">
                  {reviewCount} review{reviewCount === 1 ? "" : "s"}
                </p>
                <ul className="space-y-4">
                  {reviews.map((review, index) => {
                    const displayName = review.userEmail ?? "Customer";
                    const initial = (
                      displayName.charAt(0) ?? "?"
                    ).toUpperCase();
                    const isOwnReview =
                      !!token &&
                      !!currentUserEmail &&
                      review.userEmail === currentUserEmail &&
                      !!review._id;
                    const isEditing = editingReviewId === review._id;

                    return (
                      <li
                        key={review._id ?? `${review.createdAt}-${index}`}
                        className="rounded-2xl border border-[#E8E0D5] bg-[#F8F5F0] p-5 shadow-sm"
                      >
                        <div className="flex gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8E0D5] text-sm font-semibold text-foreground/80">
                            {initial}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-sm">
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="font-medium text-foreground">
                                  {displayName}
                                </span>
                                {review.createdAt && (
                                  <span className="text-muted-foreground">
                                    ·{" "}
                                    {new Date(
                                      review.createdAt,
                                    ).toLocaleDateString(undefined, {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </span>
                                )}
                              </div>
                              {isOwnReview && !isEditing && (
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                                    onClick={() => handleStartEdit(review)}
                                    title="Edit review"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                                    onClick={() =>
                                      setDeleteReviewId(review._id ?? null)
                                    }
                                    title="Delete review"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                            {isEditing ? (
                              <div className="mt-3 space-y-2">
                                <Textarea
                                  value={editingComment}
                                  onChange={(e) =>
                                    setEditingComment(
                                      e.target.value.slice(
                                        0,
                                        MAX_REVIEW_LENGTH,
                                      ),
                                    )
                                  }
                                  maxLength={MAX_REVIEW_LENGTH}
                                  className="min-h-[80px] resize-none rounded-xl border-[#E8E0D5] bg-background/80"
                                  disabled={putReviewMutation.isPending}
                                />
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs text-muted-foreground">
                                    {editingComment.length}/{MAX_REVIEW_LENGTH}
                                  </span>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={handleCancelEdit}
                                      disabled={putReviewMutation.isPending}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={handleSaveEdit}
                                      disabled={
                                        !editingComment.trim() ||
                                        putReviewMutation.isPending
                                      }
                                      className="rounded-xl bg-[#6B5344] hover:bg-[#5A4538]"
                                    >
                                      {putReviewMutation.isPending
                                        ? "Saving..."
                                        : "Save"}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              review.comment && (
                                <p className="mt-2 text-foreground leading-relaxed">
                                  {review.comment}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container">
            <h2 className="section-heading mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Delete review confirmation */}
      <AlertDialog
        open={!!deleteReviewId}
        onOpenChange={(open) => !open && setDeleteReviewId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete review?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove your review. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteReviewMutation.isPending}
            >
              {deleteReviewMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
