import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LazyImage from "@/components/ui/LazyImage";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Youtube,
} from "lucide-react";
import logo from "@/assets/kuppam_organics-logo.png";
import mvpLogo from "@/assets/MVP letter head logo.png";

export default function Footer() {
  return (
    <footer className="bg-muted overflow-x-hidden">
      {/* Main Footer */}
      <div className="container py-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 min-w-0"
          >
            <Link
              to="/home"
              className="flex flex-col sm:flex-row items-center gap-3 mb-4"
            >
              <LazyImage
                src={logo}
                alt="Kuppam Organics"
                className="w-[120px] h-[120px] sm:w-[120px] sm:h-[120px] md:w-[120px] md:h-[120px] object-contain flex-shrink-0"
                eager={true}
              />
              <span className="font-heading text-lg font-bold text-primary">
                Kuppam Organics
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Bringing the purity of traditional Indian farming and organic
              wellness to your doorstep since 2017.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="min-w-0"
          >
            <h4 className="font-heading font-semibold text-foreground mb-4 uppercase text-sm tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary transition-colors"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  Our Farmers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Wholesale
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="min-w-0"
          >
            <h4 className="font-heading font-semibold text-foreground mb-4 uppercase text-sm tracking-wide">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-primary transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-primary transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Follow Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col min-w-0"
          >
            <h4 className="font-heading font-semibold text-foreground mb-4 uppercase text-sm tracking-wide">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.facebook.com/share/1Dt2PHHrHy/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/kuppamorganics?igsh=dTZtb2w4bzV1MXlj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://youtube.com/@kuppamorganics?si=FRU78wTfE3qtYC6I"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </motion.a>
            </div>
            {/* Powered by - below Follow Us only */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 pt-6 border-t border-border flex flex-col gap-2 min-w-0 w-full max-w-full"
            >
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Powered by
              </span>
              <a
                href="https://mvpinnovations.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block opacity-80 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded max-w-full min-w-0"
              >
                <LazyImage
                  src={mvpLogo}
                  alt="MVP Innovations"
                  className="h-10 sm:h-12 w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[280px] object-contain object-left"
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary/5 border-t border-border">
        <div className="container py-6 px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p className="break-words">© 2026 KUPPAM ORGANICS. SOIL TO SOUL.</p>
        </div>
      </div>
    </footer>
  );
}
