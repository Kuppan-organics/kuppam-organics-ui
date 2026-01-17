import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { usePostApiAuthRegister } from "@/api/generated/authentication/authentication";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import leftImage from "@/assets/left.png";
import rightImage from "@/assets/right.png";
import logo from "@/assets/kuppam_organics-logo.png";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();
  const { syncLocalCartToAPI } = useCart();

  const registerMutation = usePostApiAuthRegister({
    mutation: {
      onSuccess: async (data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);

          // Sync localStorage cart to API
          try {
            await syncLocalCartToAPI();
          } catch (error) {
            console.error("Failed to sync cart:", error);
          }

          toast({
            title: "Account created",
            description: "Welcome! Your account has been created successfully.",
          });
          navigate("/products");
        }
      },
      onError: (error: any) => {
        toast({
          title: "Registration failed",
          description:
            error.response?.data?.message || "Failed to create account",
          variant: "destructive",
        });
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      toast({
        title: "Terms required",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    registerMutation.mutate({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row pt-[100px]">
        {/* Left Column - Signup Form */}
        <div className="w-full lg:w-1/2 bg-[#F7F3EE] flex items-center justify-center p-8 lg:p-16 min-h-[calc(100vh-100px)] lg:min-h-0 relative overflow-hidden">
          {/* Left decorative image */}
          <div
            className="absolute inset-0 bg-cover bg-left-bottom bg-no-repeat opacity-100"
            style={{ backgroundImage: `url(${leftImage})` }}
          />
          {/* Content overlay with background for better readability */}
          <div className="w-full max-w-md relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-lg">
            <div className="mb-10">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#1A0F08] mb-3 drop-shadow-sm">
                Create Account
              </h1>
              <p className="text-base text-[#4A3A2A] font-body font-medium">
                Join the organic movement
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#1A0F08] font-body"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={registerMutation.isPending}
                  className="rounded-lg border-[#9C6B3D]/30 focus:border-[#9C6B3D] bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-[#1A0F08] font-body"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={registerMutation.isPending}
                  className="rounded-lg border-[#9C6B3D]/30 focus:border-[#9C6B3D] bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-semibold text-[#1A0F08] font-body"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  disabled={registerMutation.isPending}
                  className="rounded-lg border-[#9C6B3D]/30 focus:border-[#9C6B3D] bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#1A0F08] font-body"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                    disabled={registerMutation.isPending}
                    className="rounded-lg border-[#9C6B3D]/30 focus:border-[#9C6B3D] bg-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A3A2A] hover:text-[#1A0F08]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  className="mt-1 border-[#9C6B3D] data-[state=checked]:bg-[#C89B3C] data-[state=checked]:border-[#C89B3C]"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) =>
                    setAcceptedTerms(checked === true)
                  }
                  disabled={registerMutation.isPending}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-[#1A0F08] font-body font-medium cursor-pointer leading-relaxed"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-[#C89B3C] hover:underline font-semibold"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-[#C89B3C] hover:underline font-semibold"
                  >
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#C89B3C] hover:bg-[#B88A2F] text-[#2E1A0F] font-semibold py-6 rounded-xl flex items-center justify-center gap-2 transition-all"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-[#4A3A2A] font-body font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#C89B3C] font-semibold hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Promotional Content */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-16 relative overflow-hidden">
          {/* Right decorative image as background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${rightImage})` }}
          />
          {/* Logo overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <img
              src={logo}
              alt="Kuppam Organics Logo"
              className="w-64 h-64 lg:w-[400px] lg:h-[400px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
