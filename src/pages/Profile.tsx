import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
  LayoutDashboard,
  Clock,
  Heart,
  ShoppingBag,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { path: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "orders", label: "Order History", icon: Clock },
  { path: "wishlist", label: "Wishlist", icon: Heart },
  { path: "cart", label: "Shopping Cart", icon: ShoppingBag },
  { path: "settings", label: "Settings", icon: Settings },
];

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Navigation */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-card rounded-2xl p-4 lg:p-6 border border-border/50 shadow-soft">
                <h2 className="font-heading text-lg font-semibold mb-4 text-foreground">
                  Navigation
                </h2>
                <nav className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "dashboard"}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all relative",
                            isActive
                              ? "bg-accent/10 text-accent font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-r" />
                            )}
                            <Icon
                              className={cn(
                                "h-4 w-4",
                                isActive
                                  ? "text-accent"
                                  : "text-muted-foreground"
                              )}
                            />
                            <span className="flex-1">{item.label}</span>
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="flex-1 text-left">Log-out</span>
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
