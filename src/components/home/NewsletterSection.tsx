import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-20 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-background rounded-3xl p-10 md:p-14 shadow-card relative overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="h-8 w-8 text-gold" />
            </motion.div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Experience the Essence of Nature
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join our community of over 5,000 health-conscious families for weekly updates 
              on seasonal harvests and traditional farming insights.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full pl-5 pr-12 py-6 border-border bg-card"
                  required
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 whitespace-nowrap"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Sign Up for Newsletter
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
