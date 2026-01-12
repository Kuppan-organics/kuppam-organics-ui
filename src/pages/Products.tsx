import { useState, useEffect } from "react";
import {
  Apple,
  Carrot,
  Fish,
  Drumstick,
  CupSoda,
  IceCream,
  Cake,
  Milk,
  ChefHat,
  Plus,
  ArrowRight,
  Truck,
  Headphones,
  ShoppingBag,
  Gift,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { useGetApiProducts, useGetApiProductsCategories } from "@/api/generated/products/products";
import caresole from "@/assets/caresole.png";
import caresole1 from "@/assets/caresole1.png";
import caresole3 from "@/assets/caresole3.png";
import bgImage from "@/pages/illustrations/bg.png";
import type { Product as ApiProduct } from "@/api/generated/models";
import type { Product } from "@/lib/types";

interface CategoryItem {
  id: string;
  name: string;
  icon: typeof Apple;
}

const categoryItems: CategoryItem[] = [
  { id: "fruits", name: "Fresh Fruit", icon: Apple },
  { id: "vegetables", name: "Vegetables", icon: Carrot },
  { id: "fish", name: "River Fish", icon: Fish },
  { id: "meat", name: "Chicken & Meat", icon: Drumstick },
  { id: "drinks", name: "Drink & Water", icon: CupSoda },
  { id: "yogurt", name: "Yogurt & Ice Cream", icon: IceCream },
  { id: "cake", name: "Cake & Bread", icon: Cake },
  { id: "butter", name: "Butter & Cream", icon: Milk },
  { id: "cooking", name: "Cooking", icon: ChefHat },
];

const carouselImages = [caresole, caresole1, caresole3];

const carouselContent = [
  {
    title: "Fresh & Healthy",
    subtitle: "Organic Food",
    saleText: "SALE UP TO",
    discount: "48% OFF",
    buttonText: "Shop now",
  },
  {
    title: "Farm Fresh",
    subtitle: "Direct to You",
    saleText: "SALE UP TO",
    discount: "35% OFF",
    buttonText: "Shop now",
  },
  {
    title: "Pure & Natural",
    subtitle: "Traditional Quality",
    saleText: "SALE UP TO",
    discount: "42% OFF",
    buttonText: "Shop now",
  },
];

// Helper function to map API product to local Product type
const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
  return {
    id: apiProduct.id || "",
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.discountedPrice || apiProduct.price,
    originalPrice: apiProduct.discountedPrice ? apiProduct.price : undefined,
    image: apiProduct.images?.[0] || "/placeholder.svg",
    category: apiProduct.category.toLowerCase(),
    weight: "1 kg", // Default weight, can be updated if API provides it
    inStock: (apiProduct.stock || 0) > 0,
  };
};

export default function Products() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("vegetables");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch products from API
  const { data: productsData, isLoading: productsLoading, error: productsError } = useGetApiProducts({
    category: selectedCategory !== "vegetables" ? selectedCategory : undefined,
  });

  // Fetch categories from API
  const { data: categoriesData } = useGetApiProductsCategories();

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  // Map API products to local Product type
  const filteredProducts: Product[] = productsData?.products
    ? productsData.products.map(mapApiProductToProduct)
    : [];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Sidebar and Carousel Row */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar - Categories */}
          <aside className="w-full lg:w-64 bg-card border-r border-border/50 shrink-0 lg:h-[500px] xl:h-[600px]">
            <div className="p-4 lg:p-6 h-full flex flex-col">
              <h2 className="font-heading text-lg font-semibold mb-4 text-foreground hidden lg:block">
                Categories
              </h2>
              <div className="space-y-1 flex-1 overflow-y-auto">
                {categoryItems.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isSelected
                          ? "bg-accent text-accent-foreground font-medium shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isSelected
                            ? "text-accent-foreground"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="flex-1 text-left">{category.name}</span>
                    </button>
                  );
                })}
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
                  <Plus className="h-4 w-4" />
                  <span className="flex-1 text-left">View all Category</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content - Hero Carousel */}
          <main className="flex-1">
            <section className="relative overflow-hidden h-[500px] lg:h-[500px] xl:h-[600px]">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={carouselImages[currentSlide]}
                  alt={`Carousel ${currentSlide + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                {/* Gradient overlay only on left side for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12 h-full flex flex-col justify-center">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  {/* Left Content */}
                  <div className="flex-1 space-y-4 lg:space-y-6 text-center lg:text-left text-white">
                    <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight drop-shadow-lg">
                      {carouselContent[currentSlide].title}
                    </h1>
                    <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight drop-shadow-lg">
                      {carouselContent[currentSlide].subtitle}
                    </h2>
                    <div className="space-y-2">
                      <p className="text-sm lg:text-base text-white/90 drop-shadow-md">
                        {carouselContent[currentSlide].saleText}
                      </p>
                      <p className="text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                        {carouselContent[currentSlide].discount}
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-gold text-gold-foreground hover:bg-gold/90 font-semibold px-6 py-6 text-base lg:text-lg rounded-xl shadow-lg w-fit"
                    >
                      {carouselContent[currentSlide].buttonText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  {/* Right side - empty space for content */}
                  <div className="flex-1"></div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all z-20"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all z-20"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>

                {/* Carousel Dots */}
                <div className="flex justify-center gap-2 mt-6 lg:mt-8">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? "w-8 bg-gold"
                          : "w-2 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* Products and Service Benefits Section with Continuous Background */}
        <div className="relative">
          {/* Continuous Background Image */}
          <div className="absolute inset-0">
            <img
              src={bgImage}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Products Grid Section */}
          <section className="relative z-10 py-8 lg:py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground">
                  Our Products
                </h2>
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>
              </div>

              {productsLoading ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border/50">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm">Loading products...</p>
                </div>
              ) : productsError ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border/50">
                  <p className="text-destructive text-sm mb-3">
                    Failed to load products. Please try again later.
                  </p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-xl border border-border/50">
                  <p className="text-muted-foreground text-sm mb-3">
                    No products found in this category.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Service Benefits Footer */}
          <section className="relative z-10 py-8 lg:py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Free Shipping */}
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-card transition-colors">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Truck className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Free Shipping
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Free shipping with discount
                    </p>
                  </div>
                </div>

                {/* Great Support 24/7 */}
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-card transition-colors">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Headphones className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Great Support 24/7
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Instant access to Contact
                    </p>
                  </div>
                </div>

                {/* 100% Secure Payment */}
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-card transition-colors border-2 border-accent/20">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <ShoppingBag className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      100% Secure Payment
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We ensure your money is safe
                    </p>
                  </div>
                </div>

                {/* Money-Back Guarantee */}
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-card transition-colors">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Gift className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      Money-Back Guarantee
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      30 days money-back
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
