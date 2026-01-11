import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Plus } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const badgeStyles = {
  organic: 'bg-accent/15 text-accent',
  bestseller: 'bg-gold/15 text-gold',
  new: 'bg-secondary/15 text-secondary',
  sale: 'bg-destructive/15 text-destructive',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-shadow duration-300 border border-border/30"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badge */}
          {product.badge && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm ${badgeStyles[product.badge]}`}
            >
              {product.badge === 'bestseller' ? 'Best Seller' : product.badge}
            </motion.span>
          )}

          {/* Floating action button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1 }}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-10 h-10 rounded-full bg-gold text-gold-foreground shadow-lg flex items-center justify-center hover:bg-gold/90 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-[10px] text-accent font-medium uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-heading font-semibold text-base text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            {product.weight}
          </p>
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-bold text-lg text-foreground">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/5 text-xs h-8 px-4 rounded-full"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
