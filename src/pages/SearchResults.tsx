import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Filter,
  ChevronDown,
  Star,
  Loader2,
  Home,
  ShoppingBag,
  Heart,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  useGetApiProducts,
  useGetApiProductsCategories,
} from "@/api/generated/products/products";
import { queryConfig } from "@/lib/queryConfig";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import type { Product as ApiProduct } from "@/api/generated/models";
import type { Product } from "@/lib/types";
import banner from "@/pages/illustrations/Breadcrumbs.png";

// Helper function to map API product to local Product type
const mapApiProductToProduct = (
  apiProduct: ApiProduct
): Product & { discount?: number } => {
  const hasDiscount =
    apiProduct.discountedPrice && apiProduct.discountedPrice < apiProduct.price;
  const discountPercentage = apiProduct.discount
    ? apiProduct.discount
    : hasDiscount && apiProduct.price > 0
    ? Math.round(
        ((apiProduct.price - apiProduct.discountedPrice!) / apiProduct.price) *
          100
      )
    : undefined;

  return {
    id: apiProduct.id || "",
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.discountedPrice || apiProduct.price,
    originalPrice: apiProduct.discountedPrice ? apiProduct.price : undefined,
    image: apiProduct.images?.[0] || "/placeholder.svg",
    category: apiProduct.category?.toLowerCase() || "uncategorized",
    weight: "1 kg",
    inStock: (apiProduct.stock || 0) > 0,
    discount: discountPercentage,
  };
};

const categoryItems = [
  { id: "fruits", name: "Fresh Fruit" },
  { id: "vegetables", name: "Vegetables" },
  { id: "fish", name: "River Fish" },
  { id: "meat", name: "Chicken & Meat" },
  { id: "drinks", name: "Drink & Water" },
  { id: "yogurt", name: "Yogurt & Ice Cream" },
  { id: "cake", name: "Cake & Bread" },
  { id: "butter", name: "Butter & Cream" },
  { id: "cooking", name: "Cooking" },
];

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 1500]);
  const [sortBy, setSortBy] = useState("latest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { addItem } = useCart();

  // Fetch products with search query
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetApiProducts(
    {
      search: searchQuery || undefined,
      category: selectedCategory || undefined,
    },
    {
      query: {
        ...queryConfig.products,
        enabled: !!searchQuery,
      },
    }
  );

  // Filter products by price
  const filteredProducts: (Product & { discount?: number })[] =
    productsData?.products
      ? productsData.products.map(mapApiProductToProduct).filter((product) => {
          const price = product.price;
          const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
          return inPriceRange;
        })
      : [];

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return 0; // Keep original order
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // If no search query, show message
  if (!searchQuery) {
    return (
      <Layout>
        <div className="min-h-screen bg-background pt-24">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center py-12 bg-card rounded-xl border border-border/50">
              <p className="text-muted-foreground text-sm mb-3">
                Please enter a search query to find products.
              </p>
              <Link to="/products">
                <Button variant="outline" className="mt-4">
                  Browse All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Get category name if selected
  const selectedCategoryName = selectedCategory
    ? categoryItems.find((cat) => cat.id === selectedCategory)?.name
    : null;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Banner with Breadcrumb - positioned right below header */}
        <div className="relative w-full h-[200px] sm:h-[240px] overflow-hidden -mt-[100px] pt-[100px]">
          {/* Purple top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600 z-20" />

          {/* Banner Background Image */}
          <div className="absolute inset-0 overflow-hidden bg-gray-900">
            <img
              src={banner}
              alt="Banner"
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-gray-900/40 to-transparent" />
          </div>

          {/* Breadcrumb Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-2 text-sm">
                {/* Home Icon */}
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Home className="h-4 w-4" />
                </Link>

                {/* Chevron */}
                <ChevronRight className="h-4 w-4 text-gray-400" />

                {/* Categories or Search */}
                {selectedCategoryName ? (
                  <>
                    <span className="text-gray-300">Categories</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <span className="text-green-500 font-semibold">
                      {selectedCategoryName}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-gray-300">Search</span>
                    {searchQuery && (
                      <>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <span className="text-green-500 font-semibold">
                          &quot;{searchQuery}&quot;
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters */}
            <aside className="w-full lg:w-80 shrink-0">
              <div className="bg-card rounded-xl border border-border/50 p-6 space-y-6">
                {/* Filter Button for Mobile */}
                <Collapsible
                  open={isFilterOpen}
                  onOpenChange={setIsFilterOpen}
                  className="lg:hidden"
                >
                  <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors mb-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      <span className="font-semibold">Filter</span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isFilterOpen ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-6 pt-4">
                      {/* Categories */}
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">
                          All Categories
                        </h3>
                        <div className="space-y-2">
                          {categoryItems.map((category) => (
                            <label
                              key={category.id}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                            >
                              <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === category.id}
                                onChange={() =>
                                  setSelectedCategory(
                                    selectedCategory === category.id
                                      ? null
                                      : category.id
                                  )
                                }
                                className="w-4 h-4 text-accent accent-accent"
                              />
                              <span className="flex-1 text-sm text-foreground">
                                {category.name}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Price Filter */}
                      <Collapsible>
                        <CollapsibleTrigger className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <h3 className="font-semibold text-foreground">
                            Price
                          </h3>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pt-4">
                          <div className="space-y-4">
                            <input
                              type="range"
                              min="0"
                              max="2000"
                              step="50"
                              value={priceRange[1]}
                              onChange={(e) =>
                                setPriceRange([
                                  priceRange[0],
                                  Number(e.target.value),
                                ])
                              }
                              className="w-full accent-accent"
                            />
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground font-medium">
                                Price {priceRange[0]} - {priceRange[1]}
                              </span>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Desktop Filters - Always Visible */}
                <div className="hidden lg:block space-y-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">
                      All Categories
                    </h3>
                    <div className="space-y-2">
                      {categoryItems.map((category) => (
                        <label
                          key={category.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === category.id}
                            onChange={() =>
                              setSelectedCategory(
                                selectedCategory === category.id
                                  ? null
                                  : category.id
                              )
                            }
                            className="w-4 h-4 text-primary accent-primary"
                          />
                          <span className="flex-1 text-sm text-foreground">
                            {category.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <Collapsible>
                    <CollapsibleTrigger className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <h3 className="font-semibold text-foreground">Price</h3>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4">
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="2000"
                          step="50"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Number(e.target.value),
                            ])
                          }
                          className="w-full accent-accent"
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground font-medium">
                            Price {priceRange[0]} - {priceRange[1]}
                          </span>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </aside>

            {/* Right Content Area - Products */}
            <main className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <label className="text-sm text-muted-foreground">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="latest">Latest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {sortedProducts.length}
                  </span>{" "}
                  Results Found
                </p>
              </div>

              {/* Products Grid */}
              {productsLoading ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border/50">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
                  <p className="text-muted-foreground text-sm">
                    Loading products...
                  </p>
                </div>
              ) : productsError ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border/50">
                  <p className="text-destructive text-sm mb-3">
                    Failed to load products. Please try again later.
                  </p>
                </div>
              ) : sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
                  {sortedProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group block"
                    >
                      <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/30 relative">
                        {/* Product Image */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {!product.inStock && (
                            <div className="absolute top-3 left-3 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded">
                              Out of Stock
                            </div>
                          )}
                          {product.originalPrice && product.discount && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                              Sale {product.discount}%
                            </div>
                          )}
                          {/* Wishlist Icon */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Heart className="h-4 w-4 text-foreground" />
                          </button>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <h3 className="font-semibold text-base text-foreground mb-2 line-clamp-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="font-bold text-lg text-foreground">
                                ₹{product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={(e) => handleAddToCart(product, e)}
                              className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-colors shadow-sm"
                            >
                              <ShoppingBag className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-border/50">
                  <p className="text-muted-foreground text-sm mb-3">
                    No products found matching your search.
                  </p>
                  <Link to="/products">
                    <Button variant="outline" className="mt-4">
                      Browse All Products
                    </Button>
                  </Link>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
