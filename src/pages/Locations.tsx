import { MapPin, Phone, Clock } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { outlets } from '@/lib/data';

export default function Locations() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Stores</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Visit one of our outlets to experience our organic produce in person.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outlets.map((outlet) => (
              <div
                key={outlet.id}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{outlet.name}</h3>
                <p className="text-muted-foreground text-sm mb-1">{outlet.address}</p>
                <p className="text-muted-foreground text-sm mb-4">{outlet.city}</p>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">{outlet.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">{outlet.timings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
