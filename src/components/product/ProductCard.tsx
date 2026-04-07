import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Product, ProductVariant } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import LazyImage from "@/components/ui/LazyImage";

interface ProductCardProps {
  product: Product;
}

const badgeStyles = {
  organic: "bg-green-100 text-green-700",
  bestseller: "bg-gold/15 text-gold",
  new: "bg-secondary/15 text-secondary",
  sale: "bg-destructive/15 text-destructive",
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const hasVariants = (product.variants?.length ?? 0) > 0;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    hasVariants ? product.variants![0] : null
  );

  // Compute display price/weight based on selected variant
  const variantDiscountedPrice = selectedVariant
    ? selectedVariant.discount > 0
      ? selectedVariant.price * (1 - selectedVariant.discount / 100)
      : selectedVariant.price
    : null;
  const displayPrice = variantDiscountedPrice ?? product.price;
  const displayOriginalPrice = selectedVariant?.discount > 0
    ? selectedVariant.price
    : product.originalPrice;
  const displayWeight = selectedVariant ? selectedVariant.quantity : product.weight;
  const isVariantInStock = selectedVariant ? selectedVariant.stock > 0 : product.inStock;

  // Build a product-like object reflecting the current variant selection for cart/checkout
  const effectiveProduct = selectedVariant
    ? { ...product, price: displayPrice, originalPrice: displayOriginalPrice, weight: displayWeight }
    : product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(effectiveProduct);
    toast({
      title: "Added to Cart",
      description: `${product.name}${selectedVariant ? ` (${selectedVariant.quantity})` : ""} has been added to your cart.`,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with buy now.",
        variant: "destructive",
      });
      navigate("/login", {
        state: { from: `/product/${product.id}`, buyNow: true },
      });
      return;
    }

    navigate("/checkout", {
      state: {
        buyNow: true,
        productId: product.id,
        quantity: 1,
        product: {
          id: product.id,
          name: `${product.name}${selectedVariant ? ` (${selectedVariant.quantity})` : ""}`,
          price: displayPrice,
          image: product.image,
        },
      },
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/30"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted/50">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <LazyImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Badge - Top Left */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold ${
                badgeStyles[product.badge]
              }`}
            >
              {product.badge === "organic"
                ? "100% Organic"
                : product.badge === "bestseller"
                ? "Best Seller"
                : product.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-base text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Variant Selector */}
          {hasVariants && (
            <div
              className="flex flex-wrap gap-1.5 mb-3"
              onClick={(e) => e.preventDefault()}
            >
              {product.variants!.map((variant, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedVariant(variant);
                  }}
                  disabled={variant.stock === 0}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-all ${
                    selectedVariant?.quantity === variant.quantity
                      ? "bg-[#5D4037] text-white border-[#5D4037]"
                      : variant.stock === 0
                      ? "text-muted-foreground border-border/40 line-through opacity-50 cursor-not-allowed"
                      : "text-foreground border-border hover:border-[#5D4037] hover:text-[#5D4037]"
                  }`}
                >
                  {variant.quantity}
                </button>
              ))}
            </div>
          )}

          {/* Price and Weight */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg text-foreground">
                ₹{(Math.round(displayPrice * 10) / 10).toFixed(1)}
              </span>
              {displayOriginalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{displayOriginalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{displayWeight}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-border hover:bg-muted text-xs h-8"
              onClick={handleAddToCart}
              disabled={!isVariantInStock}
            >
              Add to Cart
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-gold hover:bg-gold/90 text-gold-foreground text-xs h-8"
              onClick={handleBuyNow}
              disabled={!isVariantInStock}
            >
              Buy
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
