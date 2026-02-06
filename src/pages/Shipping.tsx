import { Link } from "react-router-dom";
import { Truck, Package, MapPin, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import shippingBg from "./illustrations/shipping.png";

export default function Shipping() {
  return (
    <Layout>
      <div className="relative">
        {/* Full-page background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 -z-10"
          style={{ backgroundImage: `url(${shippingBg})` }}
        />
        {/* Banner Section */}
        <section className="relative pb-20 pt-8 overflow-hidden">
          <div className="container relative z-10 text-center pt-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary">
              Shipping Policy
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver the freshness of Kuppam Organics to your doorstep with care.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 -mt-12">
          <div className="container max-w-4xl">
            <div className="space-y-12">
              {/* Overview */}
              <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  How We Ship
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We partner with trusted courier services to ensure your organic produce
                and products reach you in the best condition. All orders are packed with
                eco-friendly materials and handled with care to preserve freshness.
              </p>
            </div>

            {/* Delivery Areas */}
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Delivery Areas
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We currently deliver across India. Delivery times and charges may vary
                by location. For Kuppam and nearby regions, we offer same-day or
                next-day delivery where possible.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Andhra Pradesh & Telangana: 1–3 business days</li>
                <li>South India: 2–4 business days</li>
                <li>Rest of India: 4–7 business days</li>
              </ul>
            </div>

            {/* Processing Time */}
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Processing & Tracking
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Orders are processed within 1–2 business days. You will receive an
                email and SMS with tracking details once your order is dispatched.
                Use the tracking link to follow your shipment in real time.
              </p>
            </div>

            {/* Packaging */}
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Packaging
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We use recyclable and biodegradable packaging wherever possible.
                Perishable items are packed with appropriate insulation to maintain
                quality during transit. We are committed to reducing plastic use
                in line with our sustainability values.
              </p>
            </div>

            {/* Contact */}
            <p className="text-center text-sm text-muted-foreground">
              Questions about shipping?{" "}
              <Link to="/contact" className="text-accent hover:underline font-medium">
                Contact us
              </Link>{" "}
              and we'll be happy to help.
            </p>
          </div>
        </div>
      </section>
      </div>
    </Layout>
  );
}
