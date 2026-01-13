import { useState } from "react";
import { useGetApiAdminOrders } from "@/api/generated/admin/admin";
import { usePutApiOrdersIdStatus } from "@/api/generated/orders/orders";
import { queryConfig } from "@/lib/queryConfig";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type {
  Order,
  PutApiOrdersIdStatusBody,
  PutApiOrdersIdStatusBodyStatus,
  PutApiOrdersIdStatusBodyPaymentStatus,
  OrderStatus,
} from "@/api/generated/models";
import { useQueryClient } from "@tanstack/react-query";
import {
  PutApiOrdersIdStatusBodyStatus,
} from "@/api/generated/models/putApiOrdersIdStatusBodyStatus";
import {
  PutApiOrdersIdStatusBodyPaymentStatus,
} from "@/api/generated/models/putApiOrdersIdStatusBodyPaymentStatus";

const statusOptions: { value: PutApiOrdersIdStatusBodyStatus; label: string }[] = [
  { value: "placed", label: "Placed" },
  { value: "accepted", label: "Accepted" },
  { value: "packing", label: "Packing" },
  { value: "sent_to_delivery", label: "Sent to Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const paymentStatusOptions: {
  value: PutApiOrdersIdStatusBodyPaymentStatus;
  label: string;
}[] = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "failed", label: "Failed" },
];

const statusConfig: Record<string, { icon: typeof Package; label: string; color: string }> = {
  placed: { icon: Package, label: "Placed", color: "text-blue-500" },
  accepted: { icon: Package, label: "Accepted", color: "text-yellow-500" },
  packing: { icon: Package, label: "Packing", color: "text-orange-500" },
  sent_to_delivery: { icon: Truck, label: "Out for Delivery", color: "text-purple-500" },
  delivered: { icon: CheckCircle, label: "Delivered", color: "text-green-500" },
  cancelled: { icon: XCircle, label: "Cancelled", color: "text-red-500" },
};

export default function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const queryClient = useQueryClient();

  const { data: ordersData, isLoading: ordersLoading } = useGetApiAdminOrders({
    status: statusFilter !== "all" ? (statusFilter as any) : undefined,
  }, {
    query: {
      ...queryConfig.admin,
    },
  });

  const updateStatusMutation = usePutApiOrdersIdStatus({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Order status updated",
          description: "The order status has been updated successfully.",
        });
        setStatusDialogOpen(false);
        setSelectedOrder(null);
        queryClient.invalidateQueries({ queryKey: ["getApiAdminOrders"] });
      },
      onError: (error: any) => {
        toast({
          title: "Failed to update status",
          description: error.response?.data?.message || "An error occurred",
          variant: "destructive",
        });
      },
    },
  });

  const handleStatusUpdate = (formData: {
    status?: PutApiOrdersIdStatusBodyStatus;
    paymentStatus?: PutApiOrdersIdStatusBodyPaymentStatus;
    expectedDeliveryDate?: string;
    note?: string;
  }) => {
    if (!selectedOrder?.id) return;

    const updateData: PutApiOrdersIdStatusBody = {
      status: formData.status,
      paymentStatus: formData.paymentStatus,
      expectedDeliveryDate: formData.expectedDeliveryDate,
      note: formData.note,
    };

    updateStatusMutation.mutate({
      id: selectedOrder.id,
      data: updateData,
    });
  };

  const orders = (ordersData as any)?.orders || [];

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Manage Orders</h1>
          <p className="text-muted-foreground">View and update order statuses</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>Filter and manage customer orders</CardDescription>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {ordersLoading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">Loading orders...</p>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order: Order) => {
                  const orderStatus = (order.status || "placed") as OrderStatus;
                  const status = statusConfig[orderStatus] || statusConfig.placed;
                  const StatusIcon = status.icon;

                  return (
                    <Card key={order.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <p className="font-semibold text-lg">
                              Order #{order.orderNumber || order.id || "N/A"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.statusTimeline && order.statusTimeline.length > 0
                                ? `Ordered on ${new Date(
                                    order.statusTimeline[0].timestamp || ""
                                  ).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}`
                                : "Order date not available"}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Customer: {order.user?.name || order.user?.email || "N/A"}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className={`flex items-center gap-2 ${status.color}`}>
                              <StatusIcon className="h-5 w-5" />
                              <span className="font-medium">{status.label}</span>
                            </div>
                            <Dialog
                              open={statusDialogOpen && selectedOrder?.id === order.id}
                              onOpenChange={(open) => {
                                setStatusDialogOpen(open);
                                if (open) {
                                  setSelectedOrder(order);
                                } else {
                                  setSelectedOrder(null);
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  Update Status
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Update Order Status</DialogTitle>
                                  <DialogDescription>
                                    Update the status for Order #{order.orderNumber || order.id}
                                  </DialogDescription>
                                </DialogHeader>
                                <OrderStatusForm
                                  order={order}
                                  onSubmit={handleStatusUpdate}
                                  isLoading={updateStatusMutation.isPending}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="border-t border-border pt-4">
                          <div className="space-y-2 mb-4">
                            {order.items?.map((item, index) => {
                              const itemPrice = item.price || 0;
                              const itemDiscount = item.discount || 0;
                              const finalPrice =
                                itemDiscount > 0
                                  ? itemPrice * (1 - itemDiscount / 100)
                                  : itemPrice;
                              return (
                                <div key={index} className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    {item.name || "Product"} × {item.quantity || 1}
                                  </span>
                                  <span>₹{(finalPrice * (item.quantity || 1)).toFixed(2)}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between pt-3 border-t border-border font-semibold">
                            <span>Total</span>
                            <span>₹{order.totalAmount?.toFixed(2) || "0.00"}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-6" />
                <h2 className="font-heading text-xl font-bold mb-4">No orders found</h2>
                <p className="text-muted-foreground">
                  {statusFilter !== "all"
                    ? `No orders with status "${statusOptions.find((s) => s.value === statusFilter)?.label}"`
                    : "No orders have been placed yet."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

function OrderStatusForm({
  order,
  onSubmit,
  isLoading,
}: {
  order: Order;
  onSubmit: (data: {
    status?: PutApiOrdersIdStatusBodyStatus;
    paymentStatus?: PutApiOrdersIdStatusBodyPaymentStatus;
    expectedDeliveryDate?: string;
    note?: string;
  }) => void;
  isLoading: boolean;
}) {
  const [status, setStatus] = useState<PutApiOrdersIdStatusBodyStatus | "">(
    (order.status as PutApiOrdersIdStatusBodyStatus) || ""
  );
  const [paymentStatus, setPaymentStatus] =
    useState<PutApiOrdersIdStatusBodyPaymentStatus | "">("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      status: status || undefined,
      paymentStatus: paymentStatus || undefined,
      expectedDeliveryDate: expectedDeliveryDate || undefined,
      note: note || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="status">Order Status</Label>
        <Select value={status} onValueChange={(value) => setStatus(value as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="paymentStatus">Payment Status</Label>
        <Select
          value={paymentStatus}
          onValueChange={(value) => setPaymentStatus(value as any)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment status" />
          </SelectTrigger>
          <SelectContent>
            {paymentStatusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="expectedDeliveryDate">Expected Delivery Date</Label>
        <Input
          id="expectedDeliveryDate"
          type="date"
          value={expectedDeliveryDate}
          onChange={(e) => setExpectedDeliveryDate(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="note">Note (Optional)</Label>
        <Textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about this status update"
          rows={3}
        />
      </div>

      <DialogFooter>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gold hover:bg-gold/90 text-gold-foreground"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Status"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
