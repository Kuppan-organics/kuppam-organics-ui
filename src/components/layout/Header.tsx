import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import logo from '@/assets/kuppam_organics-logo.png';

const navLinks = [
  { name: 'Shop', path: '/products' },
  { name: 'Our Story', path: '/about' },
  { name: 'Farming Practices', path: '/about#farming' },
  { name: 'Wellness', path: '/products?category=honey' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl shadow-lg py-3">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Kuppam Organics" 
              className="h-20 w-20 object-contain" 
            />
            <span className="font-heading text-lg font-bold transition-colors text-primary group-hover:text-gold">
              Kuppam Organics
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors group text-muted-foreground hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : ''
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="bg-transparent border-none outline-none text-sm w-32 lg:w-40 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button 
                variant="ghost" 
                size="icon"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/cart" className="relative">
              <Button 
                variant="ghost" 
                size="icon"
              >
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
          <nav className="lg:hidden overflow-hidden mt-4 rounded-2xl shadow-2xl bg-card/95 backdrop-blur-xl border border-border">
            <div className="flex flex-col gap-4 pt-6 pb-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors block py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 ${
                    location.pathname === link.path ? 'text-primary bg-primary/10 font-semibold' : ''
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
