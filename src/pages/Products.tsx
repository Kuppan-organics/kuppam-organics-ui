import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/lib/data';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Our Organic Products
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Browse our complete collection of farm-fresh organic produce, all grown with traditional methods.
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 bg-background">
        <div className="container">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside
              className={`lg:w-64 shrink-0 ${
                showFilters ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-lg">Categories</h3>
                  {selectedCategory && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                      className="text-xs"
                    >
                      Clear
                      <X className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {category.name}
                      <span className="float-right text-xs opacity-70">
                        ({category.productCount})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> products
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card rounded-2xl">
                  <p className="text-muted-foreground text-lg mb-4">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
