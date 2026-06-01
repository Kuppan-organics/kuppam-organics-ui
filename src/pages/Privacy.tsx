import { Link } from "react-router-dom";
import { Shield, Eye, Lock, Database, Cookie, UserCheck, Bell, FileText } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function Privacy() {
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last Updated: June 1, 2026
          </p>
          <div className="mt-6 max-w-3xl mx-auto">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <p className="text-sm text-foreground font-medium">
                🔒 We are committed to protecting your privacy and handling your data with transparency and care.
                This policy explains what information we collect, how we use it, and your rights regarding your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background -mt-12">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Introduction
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Kuppam Organics ("we," "us," or "our") operates the Kuppam Organics e-commerce platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
                <p>
                  By using our website, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Database className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <p>When you create an account or place an order, we collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Shipping and billing addresses</li>
                    <li>Payment information (processed securely through payment gateways)</li>
                    <li>Order history and preferences</li>
                    <li>Account credentials (username, encrypted password)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                  <p>When you visit our website, we automatically collect:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited, time spent on pages, and click patterns</li>
                    <li>Referral source and exit pages</li>
                    <li>Geographic location (city/region level)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Communication Data</h3>
                  <p>We collect information from your communications with us, including:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Customer support inquiries and responses</li>
                    <li>Feedback, reviews, and ratings</li>
                    <li>Newsletter subscription preferences</li>
                    <li>Survey responses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  How We Use Your Information
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Order Processing:</strong> To process and fulfill your orders, arrange delivery, and handle returns</li>
                  <li><strong>Account Management:</strong> To create and maintain your account, and provide customer support</li>
                  <li><strong>Payment Processing:</strong> To process transactions securely (payment data is handled by third-party payment processors)</li>
                  <li><strong>Communication:</strong> To send order confirmations, shipping updates, and respond to inquiries</li>
                  <li><strong>Marketing:</strong> To send promotional offers, newsletters, and product recommendations (with your consent)</li>
                  <li><strong>Personalization:</strong> To customize your shopping experience and show relevant products</li>
                  <li><strong>Analytics:</strong> To understand how users interact with our website and improve our services</li>
                  <li><strong>Security:</strong> To detect and prevent fraud, unauthorized access, and other illegal activities</li>
                  <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
                </ul>
              </div>
            </div>

            {/* Admin Access & Monitoring */}
            <div className="bg-card rounded-2xl p-8 shadow-soft border-2 border-accent/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Admin Access & Monitoring
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Our authorized administrators have access to certain user and system data to ensure smooth operations and maintain service quality:
                </p>
                <div className="bg-accent/5 rounded-lg p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What Admins Can Access:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Product inventory, pricing, and availability management</li>
                      <li>Order details, status, and fulfillment information</li>
                      <li>Customer names, contact information, and delivery addresses (for order processing only)</li>
                      <li>User account activity and order history</li>
                      <li>Customer support inquiries and correspondence</li>
                      <li>Website analytics and user behavior patterns (aggregated data)</li>
                      <li>System logs for security and troubleshooting purposes</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">What Admins Cannot Access:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Your password (stored in encrypted form only)</li>
                      <li>Complete payment card details (handled by secure payment gateways)</li>
                      <li>Your data for purposes unrelated to service provision</li>
                    </ul>
                  </div>
                </div>
                <p>
                  <strong>Purpose of Admin Monitoring:</strong> Admin access is restricted to authorized personnel and used solely for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Processing and fulfilling orders efficiently</li>
                  <li>Managing product catalog and inventory</li>
                  <li>Providing customer support and resolving issues</li>
                  <li>Detecting and preventing fraudulent activities</li>
                  <li>Maintaining platform security and performance</li>
                  <li>Improving user experience and service quality</li>
                </ul>
                <p className="text-sm bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-3 mt-4">
                  <strong>Important:</strong> All admin users are bound by strict confidentiality agreements and data protection protocols. Access is logged and monitored for security purposes.
                </p>
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Data Security
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Secure, encrypted storage of sensitive data</li>
                  <li>PCI-DSS compliant payment processing</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection practices</li>
                </ul>
                <p className="text-sm mt-3">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.
                </p>
              </div>
            </div>

            {/* Cookies & Tracking */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Cookie className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Cookies & Tracking Technologies
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We use cookies and similar tracking technologies to enhance your experience:</p>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Essential Cookies</h3>
                    <p className="text-sm">Required for basic site functionality, shopping cart, and secure login.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Functional Cookies</h3>
                    <p className="text-sm">Remember your preferences, language settings, and personalization choices.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Analytics Cookies</h3>
                    <p className="text-sm">Help us understand how visitors use our website to improve performance.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Marketing Cookies</h3>
                    <p className="text-sm">Track your browsing to show relevant advertisements (requires consent).</p>
                  </div>
                </div>
                <p className="text-sm">
                  You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.
                </p>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Third-Party Services
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We work with trusted third-party service providers to operate our business:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Payment Processors:</strong> To securely process credit card and online payments</li>
                  <li><strong>Shipping Carriers:</strong> To deliver your orders</li>
                  <li><strong>Email Service Providers:</strong> To send transactional and marketing emails</li>
                  <li><strong>Analytics Providers:</strong> To understand website usage and improve performance</li>
                  <li><strong>Cloud Hosting:</strong> To store and manage data securely</li>
                </ul>
                <p>
                  These service providers have access only to the information necessary to perform their functions and are contractually obligated to maintain the confidentiality and security of your data.
                </p>
                <p className="text-sm">
                  We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Your Privacy Rights
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>You have the following rights regarding your personal data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                  <li><strong>Objection:</strong> Object to certain processing activities, including marketing</li>
                  <li><strong>Portability:</strong> Request your data in a structured, machine-readable format</li>
                  <li><strong>Restriction:</strong> Request restriction of processing under certain circumstances</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for data processing where consent was given</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact us at{" "}
                  <a href="mailto:privacy@kuppamorganics.com" className="text-accent hover:underline">
                    privacy@kuppamorganics.com
                  </a>
                  . We will respond to your request within 30 days.
                </p>
              </div>
            </div>

            {/* Marketing Communications */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Marketing Communications
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  With your consent, we may send you promotional emails about new products, special offers, and other information we think you may find interesting.
                </p>
                <p>
                  You can opt out of marketing communications at any time by:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Clicking the "unsubscribe" link in any marketing email</li>
                  <li>Updating your preferences in your account settings</li>
                  <li>Contacting us directly at support@kuppamorganics.com</li>
                </ul>
                <p className="text-sm">
                  Note: You will still receive transactional emails related to your orders even if you opt out of marketing communications.
                </p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Database className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Data Retention
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>We retain your personal information for as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Provide our services and fulfill orders</li>
                  <li>Comply with legal, tax, and accounting obligations</li>
                  <li>Resolve disputes and enforce our agreements</li>
                  <li>Prevent fraud and maintain security</li>
                </ul>
                <p>
                  When data is no longer needed, we securely delete or anonymize it. Order history and transaction records are retained for a minimum of 7 years to comply with tax and accounting regulations.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Children's Privacy
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </div>
            </div>

            {/* International Users */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  International Data Transfers
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Your information may be transferred to and maintained on servers located outside of your country, where data protection laws may differ. By using our services, you consent to the transfer of your information to India and other countries where we operate.
                </p>
                <p>
                  We take appropriate measures to ensure your data receives adequate protection in accordance with this privacy policy.
                </p>
              </div>
            </div>

            {/* Changes to Privacy Policy */}
            <div className="bg-card rounded-2xl p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-accent" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Changes to This Privacy Policy
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. The updated policy will be effective immediately upon posting on this page.
                </p>
                <p>
                  We encourage you to review this policy periodically. If we make significant changes, we will notify you via email or through a prominent notice on our website.
                </p>
                <p className="text-sm">
                  Your continued use of our services after changes are posted constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-accent/20">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                Contact Us About Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Privacy Email:</strong>{" "}
                  <a href="mailto:privacy@kuppamorganics.com" className="text-accent hover:underline">
                    privacy@kuppamorganics.com
                  </a>
                </p>
                <p>
                  <strong>General Support:</strong>{" "}
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
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Related Policies:{" "}
                  <Link to="/terms" className="text-accent hover:underline">
                    Terms & Conditions
                  </Link>
                  {" | "}
                  <Link to="/returns" className="text-accent hover:underline">
                    Returns & Refunds
                  </Link>
                  {" | "}
                  <Link to="/shipping" className="text-accent hover:underline">
                    Shipping Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
