import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
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
    addItem(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/50"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${badgeStyles[product.badge]}`}
          >
            {product.badge === 'bestseller' ? 'Best Seller' : product.badge}
          </span>
        )}

        {/* Quick view on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            className="shadow-lg text-xs"
          >
            <Eye className="h-3 w-3 mr-1" />
            Quick View
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-[10px] text-accent font-medium uppercase tracking-wide mb-0.5">
          {product.category}
        </p>
        <h3 className="font-heading font-semibold text-sm text-foreground mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">
          {product.weight}
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-base text-foreground">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="bg-gold hover:bg-gold/90 text-gold-foreground font-medium text-xs h-7 px-3"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
}
