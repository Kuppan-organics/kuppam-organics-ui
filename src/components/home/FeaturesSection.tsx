import { motion } from 'framer-motion';
import { Leaf, Shield, Heart, Sprout, Truck, Award } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: '100% Organic',
    description: 'No synthetic pesticides or fertilizers',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Rigorous farm-to-door quality checks',
    color: 'bg-gold/10 text-gold',
  },
  {
    icon: Heart,
    title: 'Health First',
    description: 'Nutrient-rich for your wellbeing',
    color: 'bg-destructive/10 text-destructive',
  },
  {
    icon: Sprout,
    title: 'Traditional Farming',
    description: 'Ancient methods, modern care',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Truck,
    title: 'Farm Fresh Delivery',
    description: 'Harvested and delivered within 48 hours',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: Award,
    title: 'Certified Pure',
    description: 'Third-party tested for purity',
    color: 'bg-accent/10 text-accent',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-card relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="0.5" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="bg-background rounded-2xl p-5 h-full text-center shadow-soft hover:shadow-card transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 mx-auto mb-4 rounded-xl ${feature.color} flex items-center justify-center`}
                >
                  <feature.icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-heading text-sm font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
