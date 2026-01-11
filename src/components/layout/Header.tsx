import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';

const navLinks = [
  { name: 'Shop', path: '/products' },
  { name: 'Our Story', path: '/about' },
  { name: 'Farming Practices', path: '/about#farming' },
  { name: 'Wellness', path: '/products?category=honey' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-card/95 backdrop-blur-xl shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img 
              whileHover={{ rotate: 10 }}
              src={logo} 
              alt="Kuppam Organics" 
              className="h-10 w-10 object-contain" 
            />
            <span className={`font-heading text-lg font-bold transition-colors ${
              scrolled ? 'text-primary' : 'text-card'
            } group-hover:text-gold`}>
              Kuppam Organics
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors group ${
                    scrolled ? 'text-muted-foreground hover:text-primary' : 'text-card/80 hover:text-card'
                  } ${location.pathname === link.path ? (scrolled ? 'text-primary' : 'text-card') : ''}`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              scrolled ? 'bg-muted/50' : 'bg-card/10 backdrop-blur-sm'
            }`}
          >
            <Search className={`h-4 w-4 ${scrolled ? 'text-muted-foreground' : 'text-card/60'}`} />
            <input 
              type="text" 
              placeholder="Search products..."
              className={`bg-transparent border-none outline-none text-sm w-32 lg:w-40 placeholder:text-muted-foreground ${
                scrolled ? 'text-foreground' : 'text-card placeholder:text-card/50'
              }`}
            />
          </motion.div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/login">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={scrolled ? '' : 'text-card hover:bg-card/10'}
                >
                  <User className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>

            <Link to="/cart" className="relative">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={scrolled ? '' : 'text-card hover:bg-card/10'}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gold text-xs font-bold flex items-center justify-center text-gold-foreground"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>

            {/* Mobile menu button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden ${scrolled ? '' : 'text-card hover:bg-card/10'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 pt-6 pb-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-medium transition-colors hover:text-primary ${
                        location.pathname === link.path
                          ? 'text-primary'
                          : scrolled ? 'text-muted-foreground' : 'text-card/80'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
