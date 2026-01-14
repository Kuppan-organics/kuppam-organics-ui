import { motion } from 'framer-motion';
import { Sprout, Heart, Sun } from 'lucide-react';
import logoImage from '@/assets/kuppam_organics-logo.png';

export default function BrandHeritageSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container relative">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-accent/10">
                <Sprout className="h-6 w-6 text-accent" />
              </div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Our Heritage
              </span>
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
              Rooted in Tradition, Nurtured by Nature
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Our logo tells a story that spans generations. The image of oxen and farmer 
                working together in harmony represents our commitment to traditional farming 
                methods that have stood the test of time.
              </p>
              <p>
                Just as the rising sun in our emblem brings new life each day, we believe in 
                the power of natural growth—where every seed is carefully selected, every 
                plant is nurtured with organic care, and every harvest is a celebration of 
                the earth's bounty.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-foreground font-medium">Heritage Seeds</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span className="text-foreground font-medium">Traditional Methods</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground font-medium">Organic Certified</span>
              </div>
            </div>
          </motion.div>

          {/* Center: Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-accent/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-gold/20 rounded-full"
              />
              <div className="relative z-10  rounded-full p-8 shadow-elevated">
                <img
                  src={logoImage}
                  alt="Kuppam Organics Logo - Traditional farming with oxen and farmer"
                  className="w-full max-w-[300px] h-auto rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gold/10">
                <Heart className="h-6 w-6 text-gold" />
              </div>
              <span className="text-gold font-medium text-sm uppercase tracking-wider">
                Our Promise
              </span>
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
              From Kuppam's Soil to Your Soul
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This isn't just a tagline—it's our philosophy. Every grain of rice, every 
                pulse, every spice that leaves our farms carries with it the essence of 
                Kuppam's fertile soil and the dedication of our farmers.
              </p>
              <p>
                When you choose Kuppam Organics, you're not just buying food. You're 
                connecting with a tradition of purity, nourishing your body with nature's 
                best, and supporting a way of life that honors both the land and the 
                people who tend it.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors"
              >
                <Sun className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Pure & Natural</p>
                  <p className="text-sm text-muted-foreground">
                    No chemicals, no shortcuts—just pure organic goodness
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors"
              >
                <Heart className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Holistic Nourishment</p>
                  <p className="text-sm text-muted-foreground">
                    Food that feeds not just your body, but your soul
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
