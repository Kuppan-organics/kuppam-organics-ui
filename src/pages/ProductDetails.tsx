import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Leaf,
  Truck,
  Shield,
  Loader2,
  Star,
  Check,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import {
  useGetApiProductsId,
  useGetApiProducts,
} from "@/api/generated/products/products";
import { queryConfig } from "@/lib/queryConfig";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import type { Product as ApiProduct } from "@/api/generated/models";
import type { Product } from "@/lib/types";

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
    inStock: (apiProduct.stock || 0) > 0,
  };
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    }
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="container pb-20 text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
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
            100
        )
      : 0);

  // Mock rating data (since API doesn't provide it)
  const rating = 4.8;
  const reviewCount = 156;

  // Parse nutritional benefits from description or use default
  const getNutritionalBenefits = () => {
    if (product.nutritionalInfo) {
      // Try to parse comma-separated values
      const benefits = product.nutritionalInfo.split(",").map((b) => b.trim());
      return benefits.length > 0
        ? benefits
        : ["Rich in Vitamin C", "High in Lycopene", "Low Calories"];
    }
    return ["Rich in Vitamin C", "High in Lycopene", "Low Calories"];
  };

  const nutritionalBenefits = getNutritionalBenefits();

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} added to your cart.`,
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
          price: product.price,
          image: product.image,
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
            {/* Image Panel */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted/30 shadow-card relative">
                <img
                  src={apiProduct.images?.[0] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
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

            {/* Product Info Panel */}
            <div className="space-y-6">
              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
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
                <span className="text-foreground font-medium">{rating}</span>
                <span className="text-muted-foreground">
                  ({reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-4xl font-bold text-foreground">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-muted-foreground text-lg">
                  /{product.weight}
                </span>
              </div>

              {/* Farming Method */}
              <div className="bg-[#E8F5E9] rounded-xl p-4 border border-[#C8E6C9]">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-[#4CAF50]" />
                  <h3 className="font-heading font-semibold text-foreground">
                    Farming Method
                  </h3>
                </div>
                <p className="text-sm text-foreground/80">
                  {product.farmingMethod ||
                    "Traditional organic farming with natural compost"}
                </p>
              </div>

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

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold w-full py-6 text-lg rounded-xl"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full py-6 text-lg rounded-xl"
                  onClick={handleBuyNow}
                >
                  Buy Now
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
    </Layout>
  );
}
