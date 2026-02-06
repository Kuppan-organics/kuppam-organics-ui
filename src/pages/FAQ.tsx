import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What does 'organic' mean for your products?",
    answer:
      "Our products are grown without synthetic fertilizers, pesticides, or GMOs. We follow traditional and certified organic farming practices. Where applicable, we work with farmers who use natural inputs and sustainable methods to bring you pure, chemical-free produce and goods.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "We deliver across India. Delivery times vary by location: Andhra Pradesh and Telangana typically 1–3 business days, South India 2–4 days, and rest of India 4–7 business days. You will receive tracking details once your order is dispatched.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After your order is shipped, you will receive an email and SMS with a tracking link. You can use this link to see the real-time status and estimated delivery date of your shipment.",
  },
  {
    question: "What if my order arrives damaged or incorrect?",
    answer:
      "Please contact us within 48 hours of delivery with your order number and photos (if relevant). We will arrange a replacement or full refund for damaged, defective, or incorrect items. See our Returns & Refunds page for full details.",
  },
  {
    question: "Do you offer wholesale or bulk orders?",
    answer:
      "Yes. For wholesale, bulk, or institutional orders, please reach out via our Contact page or email us at hello@kuppamorganics.com. We’ll get back to you with pricing and delivery options.",
  },
  {
    question: "How do I store your organic products?",
    answer:
      "Storage depends on the product. Fresh produce is best kept in a cool, dry place or refrigerated as needed. Oils and honey should be stored in a cool, dark place. Grains and pulses keep well in airtight containers. Specific storage tips are included on product pages and packaging where applicable.",
  },
  {
    question: "Are your packaging materials eco-friendly?",
    answer:
      "We use recyclable and biodegradable packaging wherever possible and are committed to reducing plastic. Our goal is to align our packaging with our sustainability values without compromising product quality during transit.",
  },
  {
    question: "How can I get in touch with you?",
    answer:
      "You can reach us via the Contact page on our website, or email hello@kuppamorganics.com for general queries and support@kuppamorganics.com for order-related issues. We also list our phone number and address on the Contact page.",
  },
];

export default function FAQ() {
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
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quick answers to common questions about orders, delivery, and our products.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 bg-background -mt-12">
        <div className="container max-w-3xl">
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
            <div className="p-6 md:p-8 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Common questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="px-6 md:px-8">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-accent hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Still have questions?{" "}
            <Link to="/contact" className="text-accent hover:underline font-medium">
              Contact us
            </Link>{" "}
            and we’ll get back to you soon.
          </p>
        </div>
      </section>
    </Layout>
  );
}
