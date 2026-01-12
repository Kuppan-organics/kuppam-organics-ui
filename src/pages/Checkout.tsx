import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Checkout() {
  const { items, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container pt-24 pb-20 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">No items in cart</h1>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-24 pb-12 bg-background">
        <div className="container">
          <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="font-heading text-xl font-semibold mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main Street" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Bangalore" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input id="pincode" placeholder="560001" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="font-heading text-xl font-semibold mb-6">Payment Method</h2>
                <RadioGroup defaultValue="upi" className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <span className="font-medium">UPI</span>
                      <span className="block text-sm text-muted-foreground">Pay using Google Pay, PhonePe, etc.</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <span className="font-medium">Credit/Debit Card</span>
                      <span className="block text-sm text-muted-foreground">Pay securely with your card</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <span className="font-medium">Cash on Delivery</span>
                      <span className="block text-sm text-muted-foreground">Pay when you receive your order</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
                <h2 className="font-heading text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-6">
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

                <Button className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-semibold py-6 text-lg rounded-xl">
                  Place Order
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  By placing this order, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
