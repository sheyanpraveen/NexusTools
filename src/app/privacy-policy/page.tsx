import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: "Comprehensive Privacy Policy detailing our client-side computing architecture, analytics, cookie disclosures, and privacy rights.",
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl py-6 md:py-10 space-y-8">
      <Breadcrumbs items={[{ name: "Privacy Policy" }]} />

      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="text-xs text-muted-foreground">
          Last Updated: February 15, 2026 | Effective Date: January 1, 2026
        </p>
      </header>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-3 text-emerald-800 dark:text-emerald-300">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold block">Our Core Privacy Commitment:</span>
            <span>
              All calculation, cryptography, text transformation, JSON parsing, Base64 conversion, and password generation tools on {siteConfig.name} execute 100% locally in your web browser. We never store, log, transmit, or inspect your private tool inputs.
            </span>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Information We Do NOT Collect</h2>
          <p>
            When you use our online tools (such as the Password Generator, UUID Generator, Base64 Decoder, Hash Generator, Loan Calculator, or Word Counter), your inputs are processed purely via client-side JavaScript within your device&apos;s runtime environment. We do not transmit or record your financial values, passwords, text documents, or payload data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. Information We May Collect Automatically</h2>
          <p>
            Like standard web platforms, we may collect non-personally identifiable technical information when you navigate our website to ensure site stability and performance:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Browser type, device classification, operating system, and screen resolution</li>
            <li>Aggregated page interaction counts and referral headers</li>
            <li>IP addresses in server logs for automated DDoS mitigation and cybersecurity defense</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. Third-Party Services & Google Advertising</h2>
          <p>
            We may partner with third-party advertising and analytics services, including Google LLC (Google Analytics and Google AdSense):
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Google, as a third-party vendor, uses cookies to serve ads on our site based on users&apos; visits to this and other websites across the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a>.</li>
            <li>Third-party ad networks or servers may use cookies, JavaScript, or Web Beacons in their advertisements and links to measure campaign effectiveness. {siteConfig.name} has no access to or control over these cookies.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">4. Cookies & Local Storage</h2>
          <p>
            We use localized browser storage (`localStorage`) exclusively to save your UI preferences (such as Light or Dark mode). We do not use persistent tracking cookies to uniquely identify your physical identity. For detailed cookie information, please see our <a href="/cookie-policy" className="text-primary hover:underline font-medium">Cookie Policy</a>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">5. GDPR & CCPA/CPRA Rights</h2>
          <p>
            Depending on your jurisdiction (such as the European Economic Area or the State of California), you may have legal rights regarding your personal data, including the right to access, rectify, or request deletion of server logs, as well as the right to opt out of the sale or sharing of personal data. To exercise these rights, contact us at privacy@nexustools.io.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">6. Contacting Us</h2>
          <p>
            If you have questions regarding this Privacy Policy or our security practices, please contact:
          </p>
          <div className="p-3.5 rounded-lg bg-muted/40 border border-border font-mono text-xs text-foreground">
            {siteConfig.name} Privacy Operations<br />
            Email: privacy@nexustools.io<br />
            Website: {siteConfig.url}
          </div>
        </section>
      </div>
    </div>
  );
}
