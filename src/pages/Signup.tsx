import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import logo from '@/assets/logo.png';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Layout>
      <section className="py-16 bg-background min-h-[70vh] flex items-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              {/* Logo */}
              <div className="text-center mb-8">
                <img src={logo} alt="Kuppam Organics" className="h-20 w-20 mx-auto mb-4" />
                <h1 className="font-heading text-2xl font-bold text-foreground">
                  Create Account
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Join the organic movement
                </p>
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox id="terms" className="mt-1" />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal">
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-semibold py-5 rounded-xl"
                >
                  Create Account
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
