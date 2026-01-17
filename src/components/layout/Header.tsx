import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  Search,
  Settings,
  Package,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/CartContext";
import { useGetApiAuthProfile } from "@/api/generated/authentication/authentication";
import { UserRole } from "@/api/generated/models";
import { queryConfig } from "@/lib/queryConfig";
import logo from "@/assets/kuppam_organics-logo.png";

const navLinks = [
  { name: "Products", path: "/products" },
  { name: "Our Story", path: "/about" },
  { name: "Locations", path: "/locations" },
  { name: "Contact Us", path: "/contact" },
  { name: "Login", path: "/login" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Get user profile to check if admin with optimized caching
  const { data: profileData } = useGetApiAuthProfile({
    query: {
      enabled: !!token,
      ...queryConfig.userProfile,
    },
  });
  const user = profileData?.user;
  const isAdmin = user?.role === UserRole.admin;

  // Listen for token changes (login/logout)
  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    // Check on mount and when location changes (after login/logout)
    checkToken();

    // Listen for storage changes (in case token is updated in another tab)
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [location]);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

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
                  location.pathname === link.path ? "text-primary" : ""
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="bg-transparent border-none outline-none text-sm w-32 lg:w-40 text-foreground placeholder:text-muted-foreground"
            />
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {token && (
              <>
                {isAdmin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin/products"
                          className="flex items-center gap-2"
                        >
                          <Package className="h-4 w-4" />
                          Products
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin/orders"
                          className="flex items-center gap-2"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Orders
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleProfileClick}
                >
                  <User className="h-5 w-5" />
                </Button>
              </>
            )}

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
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden overflow-hidden mt-4 rounded-2xl shadow-2xl bg-card/95 backdrop-blur-xl border border-border">
            <div className="flex flex-col gap-4 pt-6 pb-4 px-4">
              {/* Mobile Search */}
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 mb-2"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="bg-transparent border-none outline-none text-sm flex-1 text-foreground placeholder:text-muted-foreground"
                />
              </form>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors block py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10 font-semibold"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <>
                  <div className="border-t border-border my-2" />
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1">
                    Admin
                  </div>
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors block py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 ${
                      location.pathname.startsWith("/admin") &&
                      location.pathname === "/admin"
                        ? "text-primary bg-primary/10 font-semibold"
                        : ""
                    }`}
                  >
                    <Settings className="h-4 w-4 inline mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors block py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 ${
                      location.pathname === "/admin/products"
                        ? "text-primary bg-primary/10 font-semibold"
                        : ""
                    }`}
                  >
                    <Package className="h-4 w-4 inline mr-2" />
                    Products
                  </Link>
                  <Link
                    to="/admin/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors block py-2 px-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 ${
                      location.pathname === "/admin/orders"
                        ? "text-primary bg-primary/10 font-semibold"
                        : ""
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4 inline mr-2" />
                    Orders
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
