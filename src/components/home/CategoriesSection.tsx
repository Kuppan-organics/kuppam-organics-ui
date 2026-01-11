import { motion } from 'framer-motion';
import CategoryCard from '@/components/product/CategoryCard';
import { categories } from '@/lib/data';

// Extended categories for the bento grid layout
const extendedCategories = [
  ...categories,
  {
    id: 'wellness',
    name: 'Herbal & Wellness',
    description: 'Natural supplements and dried herbs.',
    image: '/placeholder.svg',
    productCount: 18,
  },
  {
    id: 'dairy',
    name: 'Dairy & Poultry',
    description: 'A2 Ghee and pasture-raised eggs.',
    image: '/placeholder.svg',
    productCount: 12,
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider mb-2 block">
              Our Collections
            </span>
            <h2 className="section-heading mb-0">Shop by Category</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground italic max-w-sm text-right hidden md:block"
          >
            "Bringing the purity of traditional Indian farming to your doorstep."
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {/* First row: 2 large cards */}
          <div className="lg:col-span-2">
            <CategoryCard 
              category={extendedCategories[0]} 
              variant="large" 
              index={0}
            />
          </div>
          <div className="lg:col-span-1">
            <CategoryCard 
              category={extendedCategories[1]} 
              variant="medium" 
              index={1}
            />
          </div>

          {/* Second row: 3 medium cards */}
          <div>
            <CategoryCard 
              category={extendedCategories[2]} 
              variant="medium" 
              index={2}
            />
          </div>
          <div>
            <CategoryCard 
              category={extendedCategories[3]} 
              variant="medium" 
              index={3}
            />
          </div>
          <div>
            <CategoryCard 
              category={extendedCategories[4]} 
              variant="medium" 
              index={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
