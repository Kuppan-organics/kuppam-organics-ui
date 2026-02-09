import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import CartContent from "@/components/cart/CartContent";
import CartSkeleton from "@/components/cart/CartSkeleton";

export default function Cart() {
  const { isLoading } = useCart();

  if (isLoading) {
    return <CartSkeleton />;
  }

  return (
    <Layout>
      {/* Header - standalone cart from nav */}
      <div className="bg-card border-b border-border">
        <div className="container py-4">
          <Link
            to="/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>

      <section className="py-12 bg-background">
        <div className="container">
          <CartContent variant="standalone" />
        </div>
      </section>
    </Layout>
  );
}
