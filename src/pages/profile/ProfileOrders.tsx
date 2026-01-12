import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetApiOrders } from "@/api/generated/orders/orders";
import type { Order } from "@/api/generated/models";

const statusConfig: Record<string, { icon: typeof Package; label: string; color: string }> = {
  pending: { icon: Package, label: "Processing", color: "text-secondary" },
  shipped: { icon: Truck, label: "Shipped", color: "text-gold" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-accent" },
  cancelled: { icon: Package, label: "Cancelled", color: "text-destructive" },
};

export default function ProfileOrders() {
  const { data: ordersData, isLoading, error } = useGetApiOrders();
  const orders = ordersData?.orders || [];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Order History
        </h1>
        <p className="text-muted-foreground">
          View and manage all your past orders
        </p>
      </div>

      {isLoading ? (
        <Card className="bg-card border-border/50 shadow-soft">
          <CardContent className="pt-12 pb-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading orders...</p>
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="bg-card border-border/50 shadow-soft">
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-destructive">Failed to load orders. Please try again later.</p>
          </CardContent>
        </Card>
      ) : orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order: Order) => {
            const orderStatus = (order.status || 'pending').toLowerCase();
            const status = statusConfig[orderStatus] || statusConfig.pending;
            const StatusIcon = status.icon;
            const orderDate = order.id ? new Date().toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }) : 'N/A';

            return (
              <Card
                key={order.id}
                className="bg-card border-border/50 shadow-soft"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-heading font-semibold text-lg text-foreground">
                        {order.id || 'N/A'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ordered on {orderDate}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${status.color}`}
                    >
                      <StatusIcon className="h-5 w-5" />
                      <span className="font-medium">{status.label}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    {order.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-2 text-foreground"
                      >
                        <span className="text-muted-foreground">
                          {item.product?.name || 'Product'} × {item.quantity || 1}
                        </span>
                        <span>
                          ₹{((item.product?.discountedPrice || item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-3 border-t border-border mt-2 font-semibold text-foreground">
                      <span>Total</span>
                      <span>₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/profile/orders/${order.id}`}>
                        View Details
                      </Link>
                    </Button>
                    {orderStatus === "delivered" && (
                      <Button
                        size="sm"
                        className="bg-gold hover:bg-gold/90 text-gold-foreground"
                      >
                        Reorder
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="bg-card border-border/50 shadow-soft">
          <CardContent className="pt-12 pb-12 text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
            <h2 className="font-heading text-xl font-bold mb-4 text-foreground">
              No orders yet
            </h2>
            <p className="text-muted-foreground mb-8">
              Start shopping to see your orders here.
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
