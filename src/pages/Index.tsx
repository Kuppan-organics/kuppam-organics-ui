import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Heart, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import CategoryCard from '@/components/product/CategoryCard';
import TestimonialCard from '@/components/product/TestimonialCard';
import { categories, products, testimonials, outlets } from '@/lib/data';
import heroImage from '@/assets/hero-farm.jpg';

const features = [
  {
    icon: Leaf,
    title: '100% Organic',
    description: 'All products grown without synthetic pesticides or fertilizers',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Rigorous quality checks from farm to your doorstep',
  },
  {
    icon: Heart,
    title: 'Health First',
    description: 'Nutrient-rich produce that supports your wellbeing',
  },
  {
    icon: Sprout,
    title: 'Traditional Farming',
    description: 'Ancient methods that protect soil and ecosystem',
  },
];

export default function Index() {
  const bestSellers = products.filter((p) => p.badge === 'bestseller' || p.badge === 'organic').slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Organic farm landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-block px-4 py-2 rounded-full bg-gold/20 text-gold font-medium text-sm mb-6">
              🌿 From Kuppam's Soil to Your Soul
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-card leading-tight mb-6">
              Pure Organic Goodness,{' '}
              <span className="text-gold">Naturally Grown</span>
            </h1>
            <p className="text-lg md:text-xl text-card/90 mb-8 leading-relaxed">
              Experience the authentic taste of traditionally farmed organic produce. 
              We bring you chemical-free food that nourishes your body and respects our earth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-card/30 text-card hover:bg-card/10 px-8 py-6 text-lg rounded-xl">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-heading">Shop by Category</h2>
            <p className="section-subheading mx-auto">
              Explore our carefully curated selection of organic produce, all grown with love and traditional methods.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="section-heading">Best Sellers</h2>
              <p className="section-subheading">
                Our most loved organic products, straight from the farm.
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-primary text-primary-foreground grain-texture">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Choose Kuppam Organics?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              We're committed to bringing you the purest organic produce while supporting traditional farming communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-primary-foreground/15 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary-foreground/80 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-heading">What Our Customers Say</h2>
            <p className="section-subheading mx-auto">
              Join thousands of happy customers who have made the switch to organic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Outlets Preview Section */}
      <section className="py-20 bg-card">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="section-heading">Visit Our Stores</h2>
              <p className="section-subheading">
                Experience our organic produce in person at one of our outlets.
              </p>
            </div>
            <Link to="/locations">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                View All Locations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {outlets.map((outlet) => (
              <div
                key={outlet.id}
                className="bg-background rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow"
              >
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {outlet.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-1">{outlet.address}</p>
                <p className="text-muted-foreground text-sm mb-3">{outlet.city}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-accent font-medium">{outlet.timings}</span>
                  <span className="text-muted-foreground">{outlet.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
