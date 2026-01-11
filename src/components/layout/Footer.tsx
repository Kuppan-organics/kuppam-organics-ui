import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">
              Join the Organic Movement
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Subscribe to get updates on fresh arrivals, special offers, and farming stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Kuppam Organics" className="h-16 w-16 object-contain bg-primary-foreground rounded-full p-1" />
            </Link>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Reviving traditional farming methods to bring you the purest organic produce from Kuppam's fertile soil.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link to="/products" className="hover:text-gold transition-colors">All Products</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link to="/locations" className="hover:text-gold transition-colors">Store Locations</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link to="/products?category=vegetables" className="hover:text-gold transition-colors">Fresh Vegetables</Link></li>
              <li><Link to="/products?category=fruits" className="hover:text-gold transition-colors">Seasonal Fruits</Link></li>
              <li><Link to="/products?category=grains" className="hover:text-gold transition-colors">Grains & Millets</Link></li>
              <li><Link to="/products?category=oils" className="hover:text-gold transition-colors">Cold-Pressed Oils</Link></li>
              <li><Link to="/products?category=honey" className="hover:text-gold transition-colors">Pure Honey</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>123 Market Road, Kuppam, Andhra Pradesh 517425</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0" />
                <span>hello@kuppamorganics.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© 2025 Kuppam Organics. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
