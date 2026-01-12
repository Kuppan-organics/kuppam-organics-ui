import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/data";

// Mock wishlist - using first 4 products as example
const wishlistItems = products.slice(0, 4);

export default function Wishlist() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          My Wishlist
        </h1>
        <p className="text-muted-foreground">
          Save your favorite products for later
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <Card className="bg-card border-border/50 shadow-soft">
          <CardContent className="pt-12 pb-12 text-center">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
            <h2 className="font-heading text-xl font-bold mb-4 text-foreground">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Start adding products to your wishlist to save them for later.
            </p>
            <Link to="/products">
              <Button className="bg-gold hover:bg-gold/90 text-gold-foreground">
                Browse Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
