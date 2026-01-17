import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const badgeStyles = {
  organic: 'bg-green-100 text-green-700',
  bestseller: 'bg-gold/15 text-gold',
  new: 'bg-secondary/15 text-secondary',
  sale: 'bg-destructive/15 text-destructive',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if user is logged in
    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to proceed with buy now.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: `/product/${product.id}`, buyNow: true } });
      return;
    }

    // Navigate to checkout with buy now info
    navigate("/checkout", {
      state: {
        buyNow: true,
        productId: product.id,
        quantity: 1,
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
    <Link
      to={`/product/${product.id}`}
      className="group block"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/30"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted/50">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Badge - Top Left */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold ${badgeStyles[product.badge]}`}
            >
              {product.badge === 'organic' ? '100% Organic' : product.badge === 'bestseller' ? 'Best Seller' : product.badge}
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

          {/* Price and Actions */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-lg text-foreground">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.weight}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-border hover:bg-muted text-xs h-8"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-gold hover:bg-gold/90 text-gold-foreground text-xs h-8"
              onClick={handleBuyNow}
            >
              Buy
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
