import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Leaf, Truck, Shield, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';
import { useGetApiProductsId, useGetApiProducts } from '@/api/generated/products/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import type { Product as ApiProduct } from '@/api/generated/models';
import type { Product } from '@/lib/types';

// Helper function to map API product to local Product type
const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
  return {
    id: apiProduct.id || "",
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.discountedPrice || apiProduct.price,
    originalPrice: apiProduct.discountedPrice ? apiProduct.price : undefined,
    image: apiProduct.images?.[0] || "/placeholder.svg",
    category: apiProduct.category.toLowerCase(),
    weight: "1 kg", // Default weight
    inStock: (apiProduct.stock || 0) > 0,
  };
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // Fetch product details
  const { data: productData, isLoading, error } = useGetApiProductsId(id || "", {
    query: { enabled: !!id },
  });

  // Fetch related products
  const { data: relatedProductsData } = useGetApiProducts({
    category: productData?.category,
  });

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

  if (error || !productData) {
    return (
      <Layout>
        <div className="container pb-20 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const product = mapApiProductToProduct(productData);
  const relatedProducts = relatedProductsData?.products
    ? relatedProductsData.products
        .filter((p) => p.category === productData.category && p.id !== id)
        .slice(0, 4)
        .map(mapApiProductToProduct)
    : [];

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: 'Added to Cart',
      description: `${quantity}x ${product.name} added to your cart.`,
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
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-card shadow-card">
                <img
                  src={productData.images?.[0] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.badge && (
                <span className="absolute top-4 left-4 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-semibold uppercase">
                  {product.badge === 'bestseller' ? 'Best Seller' : product.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-sm font-medium uppercase mb-4">
                {product.category}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-heading text-3xl font-bold text-foreground">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-muted-foreground">/ {product.weight}</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-medium text-muted-foreground">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-10">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold flex-1 py-6 text-lg rounded-xl"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 py-6 text-lg rounded-xl border-primary text-primary hover:bg-primary/5"
                >
                  Buy Now
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-card rounded-xl">
                <div className="text-center">
                  <Leaf className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <span className="text-xs text-muted-foreground">100% Organic</span>
                </div>
                <div className="text-center">
                  <Truck className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <span className="text-xs text-muted-foreground">Fresh Delivery</span>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-accent" />
                  <span className="text-xs text-muted-foreground">Quality Assured</span>
                </div>
              </div>

              {/* Additional Info */}
              {(product.nutritionalInfo || product.farmingMethod) && (
                <div className="mt-8 space-y-4">
                  {product.nutritionalInfo && (
                    <div>
                      <h3 className="font-heading font-semibold mb-2">Nutritional Benefits</h3>
                      <p className="text-muted-foreground text-sm">{product.nutritionalInfo}</p>
                    </div>
                  )}
                  {product.farmingMethod && (
                    <div>
                      <h3 className="font-heading font-semibold mb-2">Farming Method</h3>
                      <p className="text-muted-foreground text-sm">{product.farmingMethod}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
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
