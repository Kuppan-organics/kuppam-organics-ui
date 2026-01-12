import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { usePostApiAuthLogin } from '@/api/generated/authentication/authentication';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { syncLocalCartToAPI } = useCart();

  const loginMutation = usePostApiAuthLogin({
    mutation: {
      onSuccess: async (data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          
          // Sync localStorage cart to API
          try {
            await syncLocalCartToAPI();
          } catch (error) {
            console.error('Failed to sync cart:', error);
          }
          
          toast({
            title: 'Login successful',
            description: 'Welcome back!',
          });
          navigate('/products');
        }
      },
      onError: (error: any) => {
        toast({
          title: 'Login failed',
          description: error.response?.data?.message || 'Invalid email or password',
          variant: 'destructive',
        });
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      data: {
        email,
        password,
      },
    });
  };

  return (
    <Layout>
      <section className="pb-16 bg-background min-h-[70vh] flex items-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-card">
              {/* Logo */}
              <div className="text-center mb-8">
               
                <h1 className="font-heading text-2xl font-bold text-foreground">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Sign in to your account
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loginMutation.isPending}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loginMutation.isPending}
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

                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-gold-foreground font-semibold py-5 rounded-xl"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Create one
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
