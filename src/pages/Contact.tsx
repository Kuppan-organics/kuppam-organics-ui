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
                  123 Market Road, Near Bus Stand<br />
                  Kuppam, Andhra Pradesh 517425
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
                  hello@kuppamorganics.com<br />
                  support@kuppamorganics.com
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
                  +91 98765 43210<br />
                  +91 98765 43211
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

      {/* Map Section */}
      <section className="w-full">
        <div className="w-full h-[500px] md:h-[600px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789!2d78.316667!3d12.733333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad5b0b0b0b0b0b%3A0x0!2sKuppam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Kuppam Organics Location"
          />
        </div>
      </section>
    </Layout>
  );
}
