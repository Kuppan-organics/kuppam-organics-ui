import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
  variant?: 'large' | 'medium' | 'small';
  index?: number;
}

export default function CategoryCard({ category, variant = 'medium', index = 0 }: CategoryCardProps) {
  const aspectRatios = {
    large: 'aspect-[16/10]',
    medium: 'aspect-[4/3]',
    small: 'aspect-square',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/products?category=${category.id}`}
        className={`group relative block rounded-2xl overflow-hidden ${aspectRatios[variant]} shadow-soft hover:shadow-elevated transition-all duration-500`}
      >
        {/* Background Image */}
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <h3 className="font-heading text-lg md:text-xl font-bold text-card mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-card/70 mb-3 line-clamp-2">
              {category.description}
            </p>
          </motion.div>
          
          {/* Arrow button */}
          <motion.div 
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="h-5 w-5 text-card group-hover:translate-x-0.5 transition-transform" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
