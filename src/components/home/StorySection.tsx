import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StorySection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground grain-texture overflow-hidden">
      <div className="container relative">
        {/* Decorative elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-96 h-96 border border-primary-foreground/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] border border-primary-foreground/5 rounded-full"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          {/* Left: Story content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
              Our Heritage
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Reviving Ancient Farming Wisdom
            </h2>
            <div className="space-y-4 text-primary-foreground/80 leading-relaxed">
              <p>
                In the fertile lands of Kuppam, where the soil has nurtured generations of farmers, 
                we discovered a treasure trove of traditional farming wisdom that the modern world had forgotten.
              </p>
              <p>
                Our journey began with a simple question: What if we could bring back the pure, 
                unadulterated taste of food that our grandparents grew? Today, we work with over 
                200 local farmers who share our passion for organic, sustainable agriculture.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-block"
            >
              <Link to="/about">
                <Button 
                  variant="outline" 
                  className="border-2 border-primary-foreground/60 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground rounded-full px-8 py-6 text-lg group font-semibold shadow-lg"
                >
                  Read Our Full Story
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Quote cards */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 border border-primary-foreground/10"
            >
              <Quote className="h-10 w-10 text-gold mb-4" />
              <blockquote className="font-heading text-2xl md:text-3xl font-medium leading-relaxed mb-6">
                "We don't just grow food. We nurture the soil, respect the seasons, 
                and honor the ancient traditions that made our land fertile."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-heading font-bold text-xl">S</span>
                </div>
                <div>
                  <p className="font-semibold">Subbu</p>
                  <p className="text-sm text-primary-foreground/60">Founder, Kuppam Organics</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
