import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, Loader2, MapPin, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetApiOrdersId } from "@/api/generated/orders/orders";
import type { OrderStatusTimelineItem } from "@/api/generated/models";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { icon: typeof Package; label: string; color: string; bgColor: string }> = {
  placed: { icon: Package, label: "Order Placed", color: "text-secondary", bgColor: "bg-secondary/10" },
  accepted: { icon: Package, label: "Order Accepted", color: "text-secondary", bgColor: "bg-secondary/10" },
  packing: { icon: Package, label: "Packing", color: "text-secondary", bgColor: "bg-secondary/10" },
  sent_to_delivery: { icon: Truck, label: "Out for Delivery", color: "text-gold", bgColor: "bg-gold/10" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-accent", bgColor: "bg-accent/10" },
  cancelled: { icon: Package, label: "Cancelled", color: "text-destructive", bgColor: "bg-destructive/10" },
  pending: { icon: Package, label: "Processing", color: "text-secondary", bgColor: "bg-secondary/10" },
  shipped: { icon: Truck, label: "Shipped", color: "text-gold", bgColor: "bg-gold/10" },
};

interface StepperProps {
  timeline: OrderStatusTimelineItem[];
  currentStatus?: string;
}

function OrderStepper({ timeline, currentStatus }: StepperProps) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No status timeline available</p>
      </div>
    );
  }

  // Sort timeline by timestamp to ensure correct order
  const sortedTimeline = [...timeline].sort((a, b) => {
    const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return dateA - dateB;
  });

  // Get all possible statuses in order
  const allStatuses = ['placed', 'accepted', 'packing', 'sent_to_delivery', 'delivered'];
  const cancelledStatus = 'cancelled';

  // Check if order is cancelled
  const isCancelled = currentStatus?.toLowerCase() === cancelledStatus || sortedTimeline.some(item => item.status?.toLowerCase() === cancelledStatus);

  // Get completed statuses from timeline
  const completedStatuses = new Set(sortedTimeline.map(item => item.status?.toLowerCase()));

  return (
    <div className="relative">
      {allStatuses.map((status, index) => {
        const isCompleted = completedStatuses.has(status);
        const isCurrent = currentStatus?.toLowerCase() === status && !isCompleted;
        const isLast = index === allStatuses.length - 1;
        const timelineItem = sortedTimeline.find(item => item.status?.toLowerCase() === status);
        const config = statusConfig[status] || statusConfig.placed;
        const StatusIcon = config.icon;

        // Skip cancelled statuses if not cancelled
        if (status === cancelledStatus && !isCancelled) {
          return null;
        }

        return (
          <div key={status} className="relative flex items-start gap-4 pb-8 last:pb-0">
            {/* Connector Line */}
            {!isLast && (
              <div
                className={cn(
                  "absolute left-5 top-10 w-0.5 h-full",
                  isCompleted ? "bg-accent" : "bg-border"
                )}
              />
            )}

            {/* Icon Circle */}
            <div
              className={cn(
                "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                isCompleted
                  ? `${config.bgColor} border-accent ${config.color}`
                  : isCurrent
                  ? `${config.bgColor} border-gold ${config.color}`
                  : "bg-muted border-border text-muted-foreground"
              )}
            >
              <StatusIcon className="h-5 w-5" />
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-1">
                <h3
                  className={cn(
                    "font-semibold text-foreground",
                    isCompleted ? config.color : isCurrent ? "text-gold" : "text-muted-foreground"
                  )}
                >
                  {config.label}
                </h3>
                {timelineItem?.timestamp && (
                  <span className="text-sm text-muted-foreground">
                    {new Date(timelineItem.timestamp).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                )}
              </div>
              {timelineItem?.note && (
                <p className="text-sm text-muted-foreground">{timelineItem.note}</p>
              )}
              {!timelineItem && !isCompleted && (
                <p className="text-sm text-muted-foreground italic">Pending</p>
              )}
            </div>
          </div>
        );
      })}

      {/* Show cancelled status if applicable */}
      {isCancelled && (
        <div className="relative flex items-start gap-4 pt-4 border-t border-border">
          <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 bg-destructive/10 border-destructive text-destructive">
            <Package className="h-5 w-5" />
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-semibold text-destructive">Order Cancelled</h3>
            {sortedTimeline.find(item => item.status?.toLowerCase() === cancelledStatus)?.timestamp && (
              <p className="text-sm text-muted-foreground">
                {new Date(
                  sortedTimeline.find(item => item.status?.toLowerCase() === cancelledStatus)!.timestamp!
                ).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfileOrderDetails() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/profile/orders" replace />;
  }

  const { data: orderData, isLoading, error } = useGetApiOrdersId(id);
  const order = orderData?.order;

  if (isLoading) {
    return (
      <div className="space-y-6 pt-6">
        <Card className="bg-card border-border/50 shadow-soft">
          <CardContent className="pt-12 pb-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Loading order details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="space-y-6 pt-6">
        <Card className="bg-card border-border/50 shadow-soft">
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-destructive mb-4">Failed to load order details.</p>
            <Button variant="outline" asChild>
              <Link to="/profile/orders">Back to Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const orderStatus = (order.status || 'pending') as string;
  const status = statusConfig[orderStatus] || statusConfig.pending || statusConfig.placed;

  return (
    <div className="space-y-6 pt-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/profile/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Order Details
        </h1>
        <p className="text-muted-foreground">
          Order #{order.orderNumber || order.id || 'N/A'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Status Stepper */}
        <Card className="bg-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderStepper timeline={order.statusTimeline || []} currentStatus={orderStatus} />
          </CardContent>
        </Card>

        {/* Order Information */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card className="bg-card border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-semibold text-foreground">
                  {order.orderNumber || order.id || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date</span>
                <span className="text-foreground">
                  {order.statusTimeline && order.statusTimeline.length > 0
                    ? new Date(order.statusTimeline[0].timestamp || '').toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <div className={`flex items-center gap-2 ${status.color}`}>
                  <status.icon className="h-4 w-4" />
                  <span className="font-medium">{status.label}</span>
                </div>
              </div>
              {order.paymentStatus && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground capitalize">
                      {order.paymentStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              )}
              {order.expectedDeliveryDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Delivery</span>
                  <span className="text-foreground">
                    {new Date(order.expectedDeliveryDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <Card className="bg-card border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-foreground">
                  {order.shippingAddress.street && (
                    <p className="text-muted-foreground">
                      {order.shippingAddress.street}
                    </p>
                  )}
                  <p className="text-muted-foreground">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  {order.shippingAddress.country && (
                    <p className="text-muted-foreground">
                      {order.shippingAddress.country}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Order Items */}
      <Card className="bg-card border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle className="text-foreground">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items?.map((item, index) => {
              const itemPrice = item.price || 0;
              const itemDiscount = item.discount || 0;
              const finalPrice = itemDiscount > 0 
                ? itemPrice * (1 - itemDiscount / 100) 
                : itemPrice;
              return (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-border last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {item.name || 'Product'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity || 1}
                      {itemDiscount > 0 && (
                        <span className="ml-2">
                          • {itemDiscount}% off
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ₹{(finalPrice * (item.quantity || 1)).toFixed(2)}
                    </p>
                    {itemDiscount > 0 && (
                      <p className="text-sm text-muted-foreground line-through">
                        ₹{(itemPrice * (item.quantity || 1)).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="flex justify-between pt-4 mt-4 border-t border-border font-semibold text-lg text-foreground">
              <span>Total</span>
              <span>₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
