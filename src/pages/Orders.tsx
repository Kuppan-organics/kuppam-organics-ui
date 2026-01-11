import { Package, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const mockOrders = [
  {
    id: 'ORD-2025-001',
    date: '2025-01-10',
    status: 'delivered',
    total: 750,
    items: [
      { name: 'Organic Tomatoes', quantity: 2, price: 60 },
      { name: 'Forest Wild Honey', quantity: 1, price: 550 },
    ],
  },
  {
    id: 'ORD-2025-002',
    date: '2025-01-08',
    status: 'shipped',
    total: 500,
    items: [
      { name: 'Virgin Coconut Oil', quantity: 1, price: 320 },
      { name: 'Brown Rice', quantity: 1, price: 180 },
    ],
  },
];

const statusConfig = {
  pending: { icon: Package, label: 'Processing', color: 'text-secondary' },
  shipped: { icon: Truck, label: 'Shipped', color: 'text-gold' },
  delivered: { icon: CheckCircle, label: 'Delivered', color: 'text-accent' },
};

export default function Orders() {
  return (
    <Layout>
      <section className="py-12 bg-background min-h-[70vh]">
        <div className="container">
          <h1 className="font-heading text-3xl font-bold mb-8">My Orders</h1>

          {mockOrders.length > 0 ? (
            <div className="space-y-6">
              {mockOrders.map((order) => {
                const status = statusConfig[order.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;

                return (
                  <div key={order.id} className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="font-semibold text-lg">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Ordered on {new Date(order.date).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 ${status.color}`}>
                        <StatusIcon className="h-5 w-5" />
                        <span className="font-medium">{status.label}</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between py-2">
                          <span className="text-muted-foreground">
                            {item.name} × {item.quantity}
                          </span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-3 border-t border-border mt-2 font-semibold">
                        <span>Total</span>
                        <span>₹{order.total}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <Button variant="outline" size="sm">View Details</Button>
                      {order.status === 'delivered' && (
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
