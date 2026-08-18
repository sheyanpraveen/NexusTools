import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { AlertTriangle, DollarSign, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: `Calculation & Financial Disclaimer | ${siteConfig.name}`,
  description: "Important mathematical, financial, medical, and general calculation disclaimers for NexusTools.",
  alternates: {
    canonical: `${siteConfig.url}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="container max-w-4xl py-6 md:py-10 space-y-8">
      <Breadcrumbs items={[{ name: "Disclaimer" }]} />

      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Calculation & Financial Disclaimer
        </h1>
        <p className="text-xs text-muted-foreground">
          Last Updated: February 15, 2026
        </p>
      </header>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3 text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold block">Important Notice:</span>
            <span>
              All calculators, converters, and software utilities on {siteConfig.name} provide mathematical estimations and simulations for informational and educational purposes only.
            </span>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span>1. Financial & Investment Calculations</span>
          </h2>
          <p>
            Tools such as the Loan & Mortgage Calculator, Compound Interest Calculator, Simple Interest Calculator, and Discount Calculator perform standard mathematical amortization and compounding models. They do not constitute certified financial, tax, lending, or investment advice.
          </p>
          <p>
            Actual loan APRs, taxes, escrow fees, insurance requirements, and investment returns will vary based on lender terms, market fluctuations, and jurisdiction. Always consult with a qualified financial advisor, CPA, or certified lending officer prior to executing binding financial commitments.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-primary" />
            <span>2. Technical & Networking Utilities</span>
          </h2>
          <p>
            Networking tools (such as the Subnet Calculator, CIDR Calculator, and IP Inspector) are designed to assist network engineers and students with standard IPv4 routing mathematics (RFC 1918, RFC 3021). You are responsible for ensuring that network allocations and firewall rules conform to your organization&apos;s security policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. Accuracy & Error Reporting</h2>
          <p>
            We take extensive measures to verify our pure calculation engines via automated test suites. However, {siteConfig.name} cannot guarantee absolute freedom from typographical or computational discrepancies. If you discover a bug or edge-case error, please submit a report on our <a href="/contact" className="text-primary hover:underline font-semibold">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
