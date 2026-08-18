import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Zap, Lock, Award, Users, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `About Us & Mission | ${siteConfig.name}`,
  description: "Learn about NexusTools, our mission to build fast, private, and mathematically verified online utilities, and our computational review team.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-6 md:py-10 space-y-10">
      <Breadcrumbs items={[{ name: "About" }]} />

      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          About {siteConfig.name}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Building fast, accurate, and privacy-conscious online utilities designed for humans, not search algorithms.
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Our Story & Mission</h2>
          <p>
            {siteConfig.name} was created with a straightforward goal: replace bloated, ad-ridden, and slow calculation websites with clean, instant, and trustworthy software utilities. We believe that calculating a percentage, checking an IP subnet, or formatting a JSON payload should take milliseconds—without intrusive popups, deceptive download buttons, or mandatory logins.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-xl border border-border bg-card space-y-2">
            <Zap className="w-6 h-6 text-primary" />
            <h3 className="font-bold text-foreground">Blazing Performance</h3>
            <p className="text-xs">
              Every tool executes immediately in client memory with zero server round-trips and sub-second interactions.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card space-y-2">
            <Lock className="w-6 h-6 text-primary" />
            <h3 className="font-bold text-foreground">Client-Side Privacy</h3>
            <p className="text-xs">
              Cryptographic keys, passwords, hashes, and text snippets are processed 100% locally in your browser.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-border bg-card space-y-2">
            <Award className="w-6 h-6 text-primary" />
            <h3 className="font-bold text-foreground">Peer-Reviewed Math</h3>
            <p className="text-xs">
              All formulas follow international standards (IEEE 754, RFC 4648, ISO 18004) and automated unit test suites.
            </p>
          </div>
        </section>

        <section className="space-y-3 pt-4 border-t border-border">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Editorial & Review Team</h2>
          <p>
            Our calculation engines are developed by software engineers and reviewed by applied mathematicians and network engineers. Every single tool includes transparent mathematical formulas, step-by-step arithmetic breakdowns, and verified worked examples to ensure you understand exactly how numbers are computed.
          </p>
        </section>

        <section className="p-6 rounded-xl bg-muted/40 border border-border space-y-2">
          <h3 className="font-bold text-foreground">Get In Touch</h3>
          <p className="text-xs">
            Have a suggestion for a new calculator, found an edge case, or want to partner with us? Visit our{" "}
            <a href="/contact" className="text-primary font-semibold hover:underline">
              Contact Page
            </a>{" "}
            or email our engineering team directly at contact@nexustools.io.
          </p>
        </section>
      </div>
    </div>
  );
}
