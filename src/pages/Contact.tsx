import { MapPin, Phone, Mail } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      {/* Banner Section with blurred foliage effect */}
      <section className="relative pb-20 pt-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-accent/10 to-background">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236E7F3A' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            filter: 'blur(2px)',
          }} />
        </div>
        <div className="container relative z-10 text-center pt-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary">Contact Us</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-background -mt-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Card: Contact Information */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              {/* Address Section */}
              <div className="text-center pb-6 border-b border-border">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center">
                    <MapPin className="h-7 w-7 text-accent" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  RGS Complex, RR ROAD<br />
                  Bairaganipalle (Rural), Andhra Pradesh 517425
                </p>
              </div>

              {/* Email Section */}
              <div className="text-center py-6 border-b border-border">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center">
                    <Mail className="h-7 w-7 text-accent" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  kuppamorganics@gmail.com
                </p>
              </div>

              {/* Phone Section */}
              <div className="text-center pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center">
                    <Phone className="h-7 w-7 text-accent" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  +91 9346874502 <br />
                  +91 9182792525
                </p>
              </div>
            </div>

            {/* Right Card: Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <h2 className="font-heading text-2xl font-bold mb-3 text-foreground">Just Say Hello!</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Do you fancy saying hi to us or you want to get started with your order and you need our help? Feel free to contact us.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-accent/30 focus-visible:ring-accent"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-accent/30 focus-visible:ring-accent"
                  />
                </div>
                <Textarea
                  name="message"
                  placeholder="Hello!"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="border-accent/30 focus-visible:ring-accent"
                />
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="border-accent/30 focus-visible:ring-accent"
                />
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 rounded-xl"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - RGS Complex, Bairaganipalle (coordinates = visible pin in embed) */}
      <section className="w-full relative">
        <a
          href="https://www.google.com/maps/search/?api=1&query=RGS+Complex%2C+RR+ROAD%2C+Bairaganipalle+%28Rural%29%2C+Andhra+Pradesh+517425"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-[500px] md:h-[600px] relative"
          aria-label="Open Kuppam Organics location in Google Maps"
        >
          {/* Embed with lat,lng so Google shows a red pin at this spot */}
          <iframe
            src="https://www.google.com/maps?q=RGS+Complex,RR+ROAD,Bairaganipalle+(Rural),Andhra+Pradesh+517425&output=embed&z=16"
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: 'none' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Kuppam Organics Location - RGS Complex, Bairaganipalle"
          />
          {/* On-page marker so the location is always visible */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full pointer-events-none flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-red-600 border-4 border-white shadow-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="mt-1 px-3 py-1.5 bg-white/95 backdrop-blur rounded-lg shadow-md text-center whitespace-nowrap">
              <span className="text-sm font-semibold text-foreground">Kuppam Organics</span>
              <br />
              <span className="text-xs text-muted-foreground">RGS Complex, RR ROAD</span>
            </div>
          </div>
        </a>
      </section>
    </Layout>
  );
}
