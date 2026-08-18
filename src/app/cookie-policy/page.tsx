import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Cookie Policy | ${siteConfig.name}`,
  description: "Explanation of cookies, local storage, analytics, and advertising technologies used on NexusTools.",
  alternates: {
    canonical: `${siteConfig.url}/cookie-policy`,
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="container max-w-4xl py-6 md:py-10 space-y-8">
      <Breadcrumbs items={[{ name: "Cookie Policy" }]} />

      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Cookie Policy
        </h1>
        <p className="text-xs text-muted-foreground">
          Last Updated: February 15, 2026
        </p>
      </header>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, remember user preferences, and provide analytical reporting data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">2. How We Use Local Storage & Cookies</h2>
          <p>
            {siteConfig.name} uses minimal cookies and local browser storage (`localStorage`):
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong className="text-foreground">Essential UI State (Local Storage):</strong> We store your selected theme (Light vs Dark mode) locally in your browser so you don&apos;t have to re-select it on every page visit.</li>
            <li><strong className="text-foreground">Analytics Cookies:</strong> We may use privacy-respecting analytics tools to evaluate traffic patterns and tool popularity in aggregate.</li>
            <li><strong className="text-foreground">Advertising Cookies (Google AdSense):</strong> Third-party advertising partners like Google may place cookies on your browser to serve relevant, non-intrusive ads and prevent ad fraud.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. How to Manage or Disable Cookies</h2>
          <p>
            You can modify your browser settings to decline or delete cookies at any time. If you choose to disable cookies, all computational and utility tools on {siteConfig.name} will continue to function normally.
          </p>
        </section>
      </div>
    </div>
  );
}
