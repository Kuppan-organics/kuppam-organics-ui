import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About Us', path: '/about' },
  { name: 'Locations', path: '/locations' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Free delivery across Kuppam | Order above ₹500</span>
          </div>
          <div className="flex items-center gap-4">
            <span>📞 +91 98765 43210</span>
            <span>📧 hello@kuppamorganics.com</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Kuppam Organics" className="h-14 w-14 object-contain" />
            <div className="hidden sm:block">
              <h1 className="font-heading text-xl font-bold text-primary leading-tight">
                Kuppam Organics
              </h1>
              <p className="text-xs text-muted-foreground">From Soil to Soul</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gold text-xs font-bold flex items-center justify-center text-gold-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
