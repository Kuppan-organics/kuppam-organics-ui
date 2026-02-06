import { Link } from "react-router-dom";
import { RefreshCw, Package, Clock, Mail } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function Returns() {
  return (
    <Layout>
      {/* Banner Section */}
      <section className="relative pb-20 pt-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-accent/10 to-background">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236E7F3A' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              filter: "blur(2px)",
            }}
          />
        </div>
        <div className="container relative z-10 text-center pt-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-primary">
            Returns & Refunds
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We want you to be completely satisfied with your organic purchase.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background -mt-12">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            {/* Our Commitment */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Our Commitment
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                If you receive a product that is damaged, defective, or not as
                described, we will arrange a replacement or full refund. Please
                contact us within 48 hours of delivery with your order number and
                photos (if applicable) so we can resolve the issue quickly.
              </p>
            </div>

            {/* Eligibility */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Return Eligibility
                </h2>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Item received damaged or defective</li>
                <li>Wrong item or quantity shipped</li>
                <li>Product not as described on our website</li>
                <li>Quality issue (e.g. spoilage) due to transit or packing</li>
              </ul>
              <p className="text-muted-foreground text-sm">
                Due to the nature of fresh and perishable organic produce, we
                cannot accept returns for change of mind. Non-perishable items
                (e.g. oils, honey, grains) may be considered for return within
                7 days if unopened and in original packaging.
              </p>
            </div>

            {/* Process */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  How to Request a Return or Refund
                </h2>
              </div>
              <ol className="list-decimal list-inside text-muted-foreground space-y-3">
                <li>Email us at support@kuppamorganics.com with your order number and reason.</li>
                <li>Attach photos if the product is damaged or incorrect.</li>
                <li>We will respond within 24–48 hours with next steps.</li>
                <li>For eligible returns, we may ask you to ship the item back or arrange a pickup.</li>
                <li>Refunds are processed within 5–7 business days to the original payment method.</li>
              </ol>
            </div>

            {/* Contact */}
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Need Help?
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                For any questions about returns or refunds, reach out to us at{" "}
                <a
                  href="mailto:support@kuppamorganics.com"
                  className="text-accent hover:underline font-medium"
                >
                  support@kuppamorganics.com
                </a>{" "}
                or use our{" "}
                <Link to="/contact" className="text-accent hover:underline font-medium">
                  Contact page
                </Link>
                . We’re here to make things right.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
