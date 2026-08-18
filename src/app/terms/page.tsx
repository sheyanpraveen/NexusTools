import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: "Terms and conditions governing the use of NexusTools free online calculation and conversion utilities.",
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-6 md:py-10 space-y-8">
      <Breadcrumbs items={[{ name: "Terms of Service" }]} />

      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Terms of Service
        </h1>
        <p className="text-xs text-muted-foreground">
          Last Updated: February 15, 2026
        </p>
      </header>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Agreement to Terms</h2>
          <p>
            By accessing or using {siteConfig.name} ({siteConfig.url}), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Use License & Intellectual Property</h2>
          <p>
            Permission is granted to use our online calculators, converters, and software utilities for personal, educational, or commercial purposes. However, you may not:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Scrape, duplicate, or mirror substantial parts of our database, editorial text, or visual styling for competing automated sites.</li>
            <li>Attempt to decompile, reverse-engineer, or disrupt the platform infrastructure via automated DDoS attacks or script injection.</li>
            <li>Use our platform for any unlawful purpose or to facilitate unauthorized penetration testing against third parties.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. Mathematical & Informational Disclaimer</h2>
          <p>
            All tools and calculations on {siteConfig.name} are provided on an &quot;as is&quot; and &quot;as available&quot; basis for informational and educational purposes. While we maintain rigorous quality assurance, we make no warranties, expressed or implied, regarding 100% computational error-free operation or suitability for critical financial, legal, medical, or life-safety decisions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">4. Limitation of Liability</h2>
          <p>
            In no event shall {siteConfig.name}, its creators, or its contributors be liable for any damages (including, without limitation, damages for loss of profit, business interruption, or data corruption) arising out of the use or inability to use the tools on this website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">5. Changes to Terms</h2>
          <p>
            We may revise these Terms of Service at any time without prior notice. By continuing to use the website following any modifications, you agree to be bound by the revised terms.
          </p>
        </section>
      </div>
    </div>
  );
}
