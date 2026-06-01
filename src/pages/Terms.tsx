import { Link } from "react-router-dom";
import { FileText, ShoppingCart, Shield, User, Package, CreditCard, AlertCircle, Scale } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function Terms() {
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
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using Kuppam Organics services.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last Updated: June 1, 2026
          </p>
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="text-sm text-foreground font-medium">
                ⚠️ IMPORTANT: By using our website and placing orders, you agree to be bound by these Terms & Conditions.
                Please ensure you read and understand all sections before proceeding with any purchase. A missing or incomplete
                understanding of this policy may affect your transaction and payment processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background -mt-12">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            {/* Agreement to Terms */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Agreement to Terms
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and placing an order with Kuppam Organics, you confirm that you are in agreement with and bound by the terms and conditions contained below. These terms apply to the entire website and any email or other type of communication between you and Kuppam Organics.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Under no circumstances shall Kuppam Organics team be liable for any direct, indirect, special, incidental, or consequential damages, including, but not limited to, loss of data or profit, arising out of the use, or the inability to use, the materials on this site, even if the Kuppam Organics team or an authorized representative has been advised of the possibility of such damages.
              </p>
            </div>

            {/* User Accounts */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <User className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  User Accounts
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Maintaining the confidentiality of your account and password</li>
                  <li>Restricting access to your computer and account</li>
                  <li>All activities that occur under your account or password</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
                <p><strong>Eligibility:</strong> You must be at least 18 years of age to create an account and place orders. By using our services, you represent that you meet this age requirement and have the legal capacity to enter into binding contracts.</p>
                <p className="text-sm mt-3">
                  We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion, including if we suspect fraudulent activity or violation of these terms.
                </p>
              </div>
            </div>

            {/* Acceptable Use & Restrictions */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Acceptable Use & Restrictions
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>You agree to use our website and services only for lawful purposes. You are prohibited from:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Using the site in any way that violates any applicable national or international law</li>
                  <li>Exploiting, harming, or attempting to exploit or harm minors in any way</li>
                  <li>Transmitting any unauthorized advertising, promotional materials, or spam</li>
                  <li>Impersonating or attempting to impersonate Kuppam Organics, our employees, or other users</li>
                  <li>Engaging in any conduct that restricts or inhibits anyone's use of the website</li>
                  <li>Using any robot, spider, or automated device to access the site without permission</li>
                  <li>Attempting to gain unauthorized access to any portion of the website or systems</li>
                  <li>Making bulk purchases for commercial resale without prior written authorization</li>
                  <li>Using the site to conduct fraudulent activities or payment disputes</li>
                </ul>
                <p className="text-sm mt-3">
                  Violation of these restrictions may result in immediate termination of your account and legal action.
                </p>
              </div>
            </div>

            {/* Products & Orders */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Products & Orders
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p><strong>Product Information:</strong> We strive to display our organic products as accurately as possible. However, we do not guarantee that product descriptions, images, or other content are accurate, complete, reliable, or error-free. Actual product color may vary from images due to screen settings.</p>
                <p><strong>Pricing:</strong> All prices are listed in Indian Rupees (INR) and are subject to change without notice. We reserve the right to modify or discontinue products without prior notification.</p>
                <p><strong>Order Acceptance:</strong> Your receipt of an order confirmation does not signify our acceptance of your order. We reserve the right to accept or decline your order for any reason, including product availability, errors in pricing, or issues identified by our fraud prevention team.</p>
                <p><strong>Order Modifications:</strong> Once an order is placed, modifications may not be possible. Please contact us immediately if you need to change or cancel your order.</p>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Payment Terms
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We accept payment through various methods including credit cards, debit cards, UPI, net banking, and digital wallets. By providing payment information, you represent and warrant that:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You are legally authorized to use the payment method</li>
                  <li>The information you provide is true and accurate</li>
                  <li>You authorize us to charge the total amount to your payment method</li>
                  <li>You have sufficient funds or credit to complete the transaction</li>
                </ul>
                <p><strong>Payment Processing:</strong> Payment must be received by us before we process your order. We use secure, PCI-DSS compliant payment gateways and do not store your complete payment information on our servers. All payment data is encrypted during transmission.</p>
                <p><strong>Payment Failures:</strong> If a payment fails or is declined, your order will not be processed. You are responsible for ensuring your payment information is correct and that sufficient funds are available. We may attempt to contact you to resolve payment issues.</p>
                <p><strong>Taxes & Fees:</strong> All prices include applicable taxes unless stated otherwise. Additional delivery charges may apply based on your location and order value.</p>
                <p><strong>Payment Disputes & Chargebacks:</strong> If you have a concern about a charge, please contact us immediately before initiating a chargeback with your bank. Unauthorized chargebacks may result in account suspension and reporting to fraud prevention agencies. We reserve the right to dispute illegitimate chargebacks.</p>
                <p><strong>Refund Processing:</strong> Approved refunds will be processed to the original payment method within 5-7 business days. The time for the refund to appear in your account depends on your bank or payment provider.</p>
              </div>
            </div>

            {/* Shipping & Delivery */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Package className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Shipping & Delivery
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We ship to addresses within India. Delivery times are estimates and may vary based on location, weather conditions, and other factors beyond our control. Please refer to our <Link to="/shipping" className="text-accent hover:underline font-medium">Shipping Policy</Link> for detailed information.</p>
                <p>Risk of loss and title for products pass to you upon delivery to the carrier. We are not responsible for delays caused by the shipping carrier or circumstances beyond our control.</p>
                <p><strong>Perishable Products:</strong> Fresh and perishable organic products must be refrigerated immediately upon receipt. We are not liable for spoilage due to delays in unpacking or improper storage after delivery.</p>
              </div>
            </div>

            {/* Returns & Refunds */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Returns, Refunds & Cancellations
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>Please review our complete <Link to="/returns" className="text-accent hover:underline font-medium">Returns & Refunds Policy</Link> for detailed information. Key points:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Report damaged, defective, or incorrect items within 48 hours of delivery</li>
                  <li>Fresh/perishable products cannot be returned for change of mind</li>
                  <li>Non-perishable items may be returned within 7 days if unopened</li>
                  <li>Refunds are processed within 5-7 business days after approval</li>
                  <li>Order cancellations must be requested before shipment</li>
                </ul>
              </div>
            </div>

            {/* Product Claims */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Organic Certification & Product Claims
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>Our products are sourced from certified organic farms and suppliers. While we make every effort to ensure the accuracy of our organic certifications and product claims, these are subject to verification by relevant authorities.</p>
                <p>The health and nutritional information provided is for educational purposes only and does not constitute medical advice. Consult your healthcare provider before making dietary changes, especially if you have allergies or medical conditions.</p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Scale className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Intellectual Property
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>All content on this website, including text, graphics, logos, images, and software, is the property of Kuppam Organics or its content suppliers and is protected by intellectual property laws.</p>
                <p>You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.</p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Limitation of Liability
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>To the maximum extent permitted by law, Kuppam Organics shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.</p>
                <p>Our total liability for any claims under these terms shall not exceed the amount you paid to us for the specific product or service in question.</p>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Privacy & Data Protection
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>Your privacy is important to us. We collect, use, and protect your personal information in accordance with applicable data protection laws. By using our services, you consent to our collection and use of personal information as outlined in our Privacy Policy.</p>
                <p>We implement appropriate security measures to protect your data but cannot guarantee absolute security of information transmitted over the internet.</p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Scale className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Governing Law & Disputes
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p><strong>Governing Law:</strong> These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
                <p><strong>Jurisdiction:</strong> Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Kuppam, Andhra Pradesh, India.</p>
                <p><strong>Dispute Resolution Process:</strong> We are committed to resolving disputes fairly and efficiently:</p>
                <ul className="list-decimal list-inside space-y-2 ml-4">
                  <li>Contact our customer support team at support@kuppamorganics.com with details of your concern</li>
                  <li>We will acknowledge your complaint within 48 hours and investigate the matter</li>
                  <li>We will attempt to resolve the issue through good faith negotiations within 15 business days</li>
                  <li>If the dispute cannot be resolved informally, you may pursue legal remedies</li>
                </ul>
                <p className="text-sm">We strongly encourage you to contact us first to resolve any disputes amicably before pursuing formal legal action or initiating chargebacks.</p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Changes to Terms
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after changes constitutes acceptance of the modified terms.</p>
                <p>We recommend reviewing these terms periodically to stay informed of any updates.</p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-accent/20">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                Questions About These Terms?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@kuppamorganics.com" className="text-accent hover:underline">
                    support@kuppamorganics.com
                  </a>
                </p>
                <p>
                  <strong>Contact Form:</strong>{" "}
                  <Link to="/contact" className="text-accent hover:underline">
                    Contact Us
                  </Link>
                </p>
                <p>
                  <strong>Address:</strong> Kuppam Organics, Kuppam, Andhra Pradesh, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
