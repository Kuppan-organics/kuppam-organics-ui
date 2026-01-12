import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useGetApiAuthProfile } from "@/api/generated/authentication/authentication";
import { useGetApiOrders } from "@/api/generated/orders/orders";
import { Loader2 } from "lucide-react";
import type { Order, UserAddress } from "@/api/generated/models";

const statusLabels: Record<string, string> = {
  pending: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function Dashboard() {
  const { data: profileData, isLoading: profileLoading } = useGetApiAuthProfile();
  const { data: ordersData, isLoading: ordersLoading } = useGetApiOrders();

  const user = profileData?.user;
  const orders = ordersData?.orders || [];
  const recentOrders = orders.slice(0, 6); // Get latest 6 orders

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatAddress = (address?: UserAddress) => {
    if (!address) return "No address set";
    const parts = [
      address.street,
      address.city,
      address.state,
      address.zipCode,
      address.country,
    ].filter(Boolean);
    return parts.join(", ") || "No address set";
  };

  const getOrderItemCount = (order: Order) => {
    return order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  };

  if (profileLoading || ordersLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Row: User Profile and Billing Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Profile Card */}
        <Card className="bg-card border-border/50 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.profilePhoto} alt={user?.name || "User"} />
                <AvatarFallback className="bg-accent/10 text-accent text-2xl font-semibold">
                  {getInitials(user?.name || "User")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {user?.name || "User"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {user?.role || "Customer"}
                </p>
              </div>
              <Link
                to="/profile/settings"
                className="text-accent hover:underline text-sm font-medium"
              >
                Edit Profile
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Billing Address Card */}
        <Card className="bg-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground font-normal">
              Billing Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-heading font-semibold text-foreground">
                {user?.name || "No name"}
              </p>
              <p className="text-sm text-foreground mt-1">
                {formatAddress(user?.address)}
              </p>
            </div>
            <div className="space-y-1 text-sm text-foreground">
              <p>Email: {user?.email || "No email"}</p>
              <p>Phone: {user?.phone || "No phone"}</p>
            </div>
            <Link
              to="/profile/settings"
              className="text-accent hover:underline text-sm font-medium inline-block"
            >
              Edit Address
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Order History */}
      <Card className="bg-card border-border/50 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-heading text-xl font-bold text-foreground">
              Recent Order History
            </CardTitle>
            <Link
              to="/profile/orders"
              className="text-accent hover:underline text-sm font-medium"
            >
              View All
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-foreground">
                  ORDER ID
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  DATE
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  TOTAL
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  STATUS
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  ACTION
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order: Order) => {
                  const itemCount = getOrderItemCount(order);
                  const orderDate = order.id ? new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }) : 'N/A';
                  const status = order.status || 'pending';
                  
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-foreground">
                        {order.id || 'N/A'}
                      </TableCell>
                      <TableCell className="text-foreground">{orderDate}</TableCell>
                      <TableCell className="text-foreground">
                        ₹{order.totalAmount?.toFixed(2) || '0.00'} ({itemCount} Product
                        {itemCount !== 1 ? "s" : ""})
                      </TableCell>
                      <TableCell className="text-foreground">
                        {statusLabels[status] || status}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          className="text-accent hover:underline p-0 h-auto font-normal"
                          asChild
                        >
                          <Link to={`/profile/orders/${order.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No orders yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
