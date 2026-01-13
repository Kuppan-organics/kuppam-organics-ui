import { Package, Truck, CheckCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useGetApiOrders } from '@/api/generated/orders/orders';
import { queryConfig } from '@/lib/queryConfig';
import type { Order } from '@/api/generated/models';

const statusConfig: Record<string, { icon: typeof Package; label: string; color: string }> = {
  placed: { icon: Package, label: 'Placed', color: 'text-secondary' },
  accepted: { icon: Package, label: 'Accepted', color: 'text-secondary' },
  packing: { icon: Package, label: 'Packing', color: 'text-secondary' },
  sent_to_delivery: { icon: Truck, label: 'Out for Delivery', color: 'text-gold' },
  delivered: { icon: CheckCircle, label: 'Delivered', color: 'text-accent' },
  cancelled: { icon: Package, label: 'Cancelled', color: 'text-destructive' },
  // Legacy statuses for backward compatibility
  pending: { icon: Package, label: 'Processing', color: 'text-secondary' },
  shipped: { icon: Truck, label: 'Shipped', color: 'text-gold' },
};

export default function Orders() {
  const token = localStorage.getItem('token');
  const { data: ordersData, isLoading, error } = useGetApiOrders({
    query: { 
      enabled: !!token,
      ...queryConfig.orders,
    },
  });

  const orders = ordersData?.orders || [];
  return (
    <Layout>
      <section className="pb-12 bg-background min-h-[70vh]">
        <div className="container">
          <h1 className="font-heading text-3xl font-bold mb-8">My Orders</h1>

          {isLoading ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border/50">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border/50">
              <p className="text-destructive text-sm mb-3">
                Failed to load orders. Please try again later.
              </p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order: Order) => {
                const orderStatus = (order.status || 'pending') as string;
                const status = statusConfig[orderStatus] || statusConfig.pending || statusConfig.placed;
                const StatusIcon = status.icon;

                return (
                  <div key={order.id} className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="font-semibold text-lg">{order.orderNumber || order.id || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.statusTimeline && order.statusTimeline.length > 0
                            ? `Ordered on ${new Date(order.statusTimeline[0].timestamp || '').toLocaleDateString('en-IN', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                              })}`
                            : 'Order date not available'}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 ${status.color}`}>
                        <StatusIcon className="h-5 w-5" />
                        <span className="font-medium">{status.label}</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      {order.items?.map((item, index) => {
                        const itemPrice = item.price || 0;
                        const itemDiscount = item.discount || 0;
                        const finalPrice = itemDiscount > 0 
                          ? itemPrice * (1 - itemDiscount / 100) 
                          : itemPrice;
                        return (
                          <div key={index} className="flex justify-between py-2">
                            <span className="text-muted-foreground">
                              {item.name || 'Product'} × {item.quantity || 1}
                            </span>
                            <span>₹{(finalPrice * (item.quantity || 1)).toFixed(2)}</span>
                          </div>
                        );
                      })}
                      <div className="flex justify-between pt-3 border-t border-border mt-2 font-semibold">
                        <span>Total</span>
                        <span>₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <Button variant="outline" size="sm">View Details</Button>
                      {orderStatus === 'delivered' && (
                        <Button size="sm" className="bg-gold hover:bg-gold/90 text-gold-foreground">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-2xl">
              <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
              <h2 className="font-heading text-xl font-bold mb-4">No orders yet</h2>
              <p className="text-muted-foreground mb-8">
                Start shopping to see your orders here.
              </p>
              <Link to="/products">
                <Button className="bg-gold hover:bg-gold/90 text-gold-foreground">
                  Browse Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
