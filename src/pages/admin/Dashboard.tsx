import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetApiAdminStats } from "@/api/generated/admin/admin";
import { Loader2, Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { queryConfig } from "@/lib/queryConfig";

export default function AdminDashboard() {
  const { data: statsData, isLoading, error } = useGetApiAdminStats({
    query: {
      ...queryConfig.admin,
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center py-12 bg-card rounded-xl border border-border/50">
            <p className="text-destructive text-sm mb-3">
              Failed to load dashboard statistics. Please try again later.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const stats = statsData || {};

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts || 0,
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders || 0,
      icon: ShoppingCart,
      color: "text-green-500",
    },
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Total Revenue",
      value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN')}`,
      icon: TrendingUp,
      color: "text-gold",
    },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your e-commerce platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <a
                href="/admin/products"
                className="block p-3 rounded-lg hover:bg-muted transition-colors"
              >
                Manage Products
              </a>
              <a
                href="/admin/orders"
                className="block p-3 rounded-lg hover:bg-muted transition-colors"
              >
                Manage Orders
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
