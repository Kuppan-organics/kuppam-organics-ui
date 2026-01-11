import { motion } from 'framer-motion';
import { Sprout, Sun, Droplets, Truck, Home } from 'lucide-react';

const steps = [
  {
    icon: Sprout,
    title: 'Seed Selection',
    description: 'Heritage seeds preserved for generations',
    delay: 0,
  },
  {
    icon: Sun,
    title: 'Natural Growth',
    description: 'Sun-ripened without any chemicals',
    delay: 0.1,
  },
  {
    icon: Droplets,
    title: 'Pure Irrigation',
    description: 'Traditional water harvesting methods',
    delay: 0.2,
  },
  {
    icon: Truck,
    title: 'Fresh Harvest',
    description: 'Picked at peak ripeness, packed same day',
    delay: 0.3,
  },
  {
    icon: Home,
    title: 'Your Table',
    description: 'Delivered fresh within 48 hours',
    delay: 0.4,
  },
];

export default function FarmingProcess() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative line connecting the dots */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-border hidden lg:block" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider mb-2 block">
            Our Process
          </span>
          <h2 className="section-heading">From Farm to Your Table</h2>
          <p className="section-subheading mx-auto">
            Every product goes through our carefully curated organic process
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: step.delay }}
              className="relative text-center group"
            >
              {/* Step number */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative mx-auto mb-6"
              >
                <div className="w-20 h-20 rounded-full bg-card shadow-card flex items-center justify-center group-hover:shadow-elevated transition-shadow">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-gold-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </motion.div>

              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>

              {/* Connecting arrow for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 w-8 text-border">
                  <motion.svg
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: step.delay + 0.2 }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
