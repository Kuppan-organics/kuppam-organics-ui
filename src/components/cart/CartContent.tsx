import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import LazyImage from "@/components/ui/LazyImage";
import CartContentSkeleton from "./CartContentSkeleton";

type CartContentVariant = "standalone" | "embedded";

interface CartContentProps {
  variant?: CartContentVariant;
}

export default function CartContent({ variant = "standalone" }: CartContentProps) {
  const {
    items,
    updateQuantity,
    removeItem,
    totalPrice,
    totalItems,
    isLoading,
  } = useCart();

  if (isLoading) {
    return <CartContentSkeleton />;
  }

  if (items.length === 0) {
    return (
      <div className="space-y-6 pt-6">
        <div className="min-h-[50vh] flex flex-col items-center justify-center py-12">
          <div className="text-center max-w-2xl mx-auto">
            <ShoppingBag
              className="h-20 w-20 sm:h-28 sm:w-28 mx-auto text-muted-foreground/50 mb-6 flex-shrink-0"
              aria-hidden
            />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-foreground">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            {variant === "embedded" ? (
              <Link to="/profile/dashboard">
                <Button variant="outline" size="lg" className="rounded-xl">
                  Back to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-gold-foreground rounded-xl"
                >
                  Start Shopping
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Shopping Cart ({totalItems} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl p-4 md:p-6 shadow-soft flex flex-col sm:flex-row gap-4"
            >
              <Link to={`/product/${item.id}`} className="shrink-0">
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl"
                />
              </Link>

              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-heading font-semibold text-lg hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{item.weight}</p>
                  <p className="text-primary font-semibold mt-1">
                    ₹{item.price}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-destructive text-sm hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl p-6 shadow-card sticky top-28">
            <h2 className="font-heading text-xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className="text-accent font-medium">Free</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <Link to="/checkout">
              <Button className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-semibold py-6 text-lg rounded-xl">
                Proceed to Checkout
              </Button>
            </Link>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Free delivery on orders above ₹500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
