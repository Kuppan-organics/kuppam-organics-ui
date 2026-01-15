import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePostApiOrders, usePostApiOrdersBuyNow } from "@/api/generated/orders/orders";
import { useGetApiAuthProfile } from "@/api/generated/authentication/authentication";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

interface ShippingForm {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  
  // Check if this is a buy now flow
  const buyNowState = location.state as {
    buyNow?: boolean;
    productId?: string;
    quantity?: number;
    product?: { id: string; name: string; price: number; image: string };
  } | null;
  
  const isBuyNow = buyNowState?.buyNow || false;
  const buyNowProduct = buyNowState?.product;
  const buyNowProductId = buyNowState?.productId;
  const buyNowQuantity = buyNowState?.quantity || 1;
  
  // Calculate buy now total
  const buyNowTotal = buyNowProduct ? buyNowProduct.price * buyNowQuantity : 0;

  const [form, setForm] = useState<ShippingForm>({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<ShippingForm>>({});

  // Fetch user profile to pre-fill the form
  const { data: profileData } = useGetApiAuthProfile({
    query: {
      enabled: !!token,
    },
  });

  // Pre-fill form with user's saved address
  useEffect(() => {
    if (profileData?.user) {
      const user = profileData.user;
      const address = user.address;

      // Split name into first and last name
      const nameParts = (user.name || "").split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setForm((prev) => ({
        ...prev,
        firstName: prev.firstName || firstName,
        lastName: prev.lastName || lastName,
        street: prev.street || address?.street || "",
        city: prev.city || address?.city || "",
        state: prev.state || address?.state || "",
        pincode: prev.pincode || address?.zipCode || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [profileData]);

  const createOrderMutation = usePostApiOrders({
    mutation: {
      onSuccess: (data) => {
        toast.success("Order placed successfully!");
        clearCart();
        setOrderPlaced(true);
        setOrderId(data.order?.orderNumber || data.order?.id || null);
      },
      onError: () => {
        toast.error("Failed to place order. Please try again.");
      },
    },
  });

  const buyNowMutation = usePostApiOrdersBuyNow({
    mutation: {
      onSuccess: (data) => {
        toast.success("Order placed successfully!");
        setOrderPlaced(true);
        setOrderId(data.order?.orderNumber || data.order?.id || null);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to place order. Please try again.");
      },
    },
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingForm> = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!form.street.trim()) {
      newErrors.street = "Street address is required";
    }
    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!form.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!form.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "PIN code must be 6 digits";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ShippingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    // Check if user is logged in
    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    const shippingAddress = {
      street: `${form.firstName} ${form.lastName}, ${form.street}`,
      city: form.city,
      state: form.state,
      zipCode: form.pincode,
      country: "India",
    };

    if (isBuyNow && buyNowProductId) {
      // Use buy now API
      buyNowMutation.mutate({
        data: {
          productId: buyNowProductId,
          quantity: buyNowQuantity,
          shippingAddress,
        },
      });
    } else {
      // Use regular cart order API
      createOrderMutation.mutate({
        data: {
          shippingAddress,
        },
      });
    }
  };

  if (!isBuyNow && items.length === 0 && !orderPlaced) {
    return (
      <Layout>
        <div className="container pb-20 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">
            No items in cart
          </h1>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // If buy now but no product info, redirect back
  if (isBuyNow && !buyNowProduct && !buyNowProductId) {
    return (
      <Layout>
        <div className="container pb-20 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">
            Invalid buy now request
          </h1>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Order success state
  if (orderPlaced) {
    return (
      <Layout>
        <div className="container pb-20">
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-heading text-3xl font-bold mb-4 text-green-700">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your order. We'll send you a confirmation email
              shortly.
            </p>
            {orderId && (
              <p className="text-sm text-muted-foreground mb-8">
                Order ID:{" "}
                <span className="font-mono font-medium">{orderId}</span>
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/profile/orders">
                <Button className="bg-gold hover:bg-gold/90 text-gold-foreground">
                  View Orders
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pb-12 bg-background">
        <div className="container">
          <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="font-heading text-xl font-semibold mb-6">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                      id="street"
                      placeholder="123 Main Street"
                      value={form.street}
                      onChange={(e) =>
                        handleInputChange("street", e.target.value)
                      }
                      className={errors.street ? "border-red-500" : ""}
                    />
                    {errors.street && (
                      <p className="text-xs text-red-500">{errors.street}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Bangalore"
                      value={form.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="Karnataka"
                      value={form.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className={errors.state ? "border-red-500" : ""}
                    />
                    {errors.state && (
                      <p className="text-xs text-red-500">{errors.state}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      placeholder="560001"
                      value={form.pincode}
                      onChange={(e) =>
                        handleInputChange("pincode", e.target.value)
                      }
                      className={errors.pincode ? "border-red-500" : ""}
                    />
                    {errors.pincode && (
                      <p className="text-xs text-red-500">{errors.pincode}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="font-heading text-xl font-semibold mb-6">
                  Payment Method
                </h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      <span className="font-medium">UPI</span>
                      <span className="block text-sm text-muted-foreground">
                        Pay using Google Pay, PhonePe, etc.
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <span className="font-medium">Credit/Debit Card</span>
                      <span className="block text-sm text-muted-foreground">
                        Pay securely with your card
                      </span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <span className="font-medium">Cash on Delivery</span>
                      <span className="block text-sm text-muted-foreground">
                        Pay when you receive your order
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
                <h2 className="font-heading text-xl font-semibold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {isBuyNow && buyNowProduct ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={buyNowProduct.image}
                        alt={buyNowProduct.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">
                          {buyNowProduct.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {buyNowQuantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ₹{buyNowTotal}
                      </p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{isBuyNow ? buyNowTotal : totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="text-accent font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{isBuyNow ? buyNowTotal : totalPrice}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-semibold py-6 text-lg rounded-xl"
                  onClick={handlePlaceOrder}
                  disabled={isBuyNow ? buyNowMutation.isPending : createOrderMutation.isPending}
                >
                  {(isBuyNow ? buyNowMutation.isPending : createOrderMutation.isPending) ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
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
