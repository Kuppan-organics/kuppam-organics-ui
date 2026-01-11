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
      className="group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${badgeStyles[product.badge]}`}
          >
            {product.badge === 'bestseller' ? 'Best Seller' : product.badge}
          </span>
        )}

        {/* Quick actions */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button
              size="icon"
              className="bg-card hover:bg-card/90 text-foreground shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="shadow-lg"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-accent font-medium uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {product.weight}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-foreground">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold"
            onClick={handleAddToCart}
          >
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
}
