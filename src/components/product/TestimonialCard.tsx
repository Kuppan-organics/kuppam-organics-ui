import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300">
      <Quote className="h-8 w-8 text-gold/30 mb-4" />
      
      <p className="text-muted-foreground leading-relaxed mb-6 italic">
        "{testimonial.comment}"
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-heading font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {testimonial.location}
          </p>
        </div>
        
        <div className="flex gap-0.5">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-gold text-gold"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
