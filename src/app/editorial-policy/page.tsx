import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { CheckCircle2, ShieldCheck, Award, FileCode } from "lucide-react";

export const metadata: Metadata = {
  title: `Editorial & Quality Policy | ${siteConfig.name}`,
  description: "Learn how NexusTools creates, verifies, peer-reviews, and maintains our online calculators, mathematical formulas, and educational guides.",
  alternates: {
    canonical: `${siteConfig.url}/editorial-policy`,
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="container max-w-4xl py-6 md:py-10 space-y-8">
      <Breadcrumbs items={[{ name: "Editorial Policy" }]} />

      <header className="space-y-3 border-b border-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Editorial & Quality Policy
        </h1>
        <p className="text-xs text-muted-foreground">
          Last Updated: February 15, 2026
        </p>
      </header>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">1. Our Commitment to Originality & Usefulness</h2>
          <p>
            {siteConfig.name} is strictly built on a foundation of original mathematical code, useful tools, and thoroughly researched educational documentation. We never scrape competitor content, spin articles, generate automated doorway pages, or create thin filler content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">2. Tool Development & Mathematical Verification Lifecycle</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
              <span className="font-bold text-primary block">Step 1: Formula Research</span>
              <p>We source formulas from peer-reviewed mathematical standards, international SI units (BIPM), and RFC networking protocols.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
              <span className="font-bold text-primary block">Step 2: Pure Engine Build</span>
              <p>Algorithms are implemented as 100% deterministic pure functions with floating-point boundary checks and edge case handling.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1.5">
              <span className="font-bold text-primary block">Step 3: Automated Unit Testing</span>
              <p>Every calculation engine is validated against automated test suites covering positive, negative, decimal, and zero values.</p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">3. E-E-A-T (Experience, Expertise, Authoritativeness & Trust)</h2>
          <p>
            Every published tool features:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Identified author and technical reviewer credentials with stated mathematical roles</li>
            <li>Explicit mathematical formulas in clean typographic notation</li>
            <li>Step-by-step arithmetic walkthroughs with real-world worked examples</li>
            <li>Frequently asked questions addressing edge cases and mathematical nuances</li>
            <li>Timestamp of last verified update and revision history</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">4. Corrections & User Feedback</h2>
          <p>
            We take pride in maintaining 100% computational fidelity. If an edge case or rounding anomaly is identified by a user, our engineering team audits the engine, updates unit test assertions, and deploys fixes promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
