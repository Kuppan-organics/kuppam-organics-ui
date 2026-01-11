import { Link } from 'react-router-dom';
import { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group relative block rounded-2xl overflow-hidden aspect-[4/5] shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <h3 className="font-heading text-xl font-bold text-card mb-1">
          {category.name}
        </h3>
        <p className="text-sm text-card/80 mb-2 line-clamp-2">
          {category.description}
        </p>
        <span className="text-xs font-medium text-gold">
          {category.productCount} Products →
        </span>
      </div>
    </Link>
  );
}
