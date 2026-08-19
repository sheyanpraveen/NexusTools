import Link from "next/link";
import { siteConfig } from "@/config/site";
import { TOOL_LIST, getPopularTools } from "@/lib/registry/tools";
import { CATEGORY_LIST, CATEGORIES } from "@/lib/registry/categories";
import { GUIDE_LIST } from "@/lib/registry/guides";
import { ToolCard } from "@/components/tools/ToolCard";
import { CategoryCard } from "@/components/tools/CategoryCard";
import { WebSiteJsonLd } from "@/components/seo/JsonLd";
import { TopAdSlot } from "@/components/tools/AdSlot";
import {
  Sparkles,
  Search,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  const popularTools = getPopularTools();
  const guides = GUIDE_LIST.slice(0, 3);

  const quickPills = [
    { name: "Percentage", href: "/calculators/percentage-calculator" },
    { name: "Age Calculator", href: "/date-time/age-calculator" },
    { name: "Loan & Mortgage", href: "/finance/loan-calculator" },
    { name: "Subnet / CIDR", href: "/technology/subnet-calculator" },
    { name: "JSON Formatter", href: "/technology/json-formatter" },
    { name: "Word Counter", href: "/text-tools/word-counter" },
    { name: "Base64", href: "/technology/base64-encoder-decoder" },
    { name: "Password Generator", href: "/technology/password-generator" },
  ];

  return (
    <>
      <WebSiteJsonLd />

      <div className="space-y-16 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 md:pt-20 pb-12 border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container max-w-5xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>30+ Free High-Precision Online Utilities</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
              Free Online Tools <br className="hidden sm:inline" />
              <span className="text-primary">That Just Work.</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fast, accurate, and easy-to-use calculators, unit converters, network utilities, and writing tools. Zero signups, zero bloat, and 100% private.
            </p>

            {/* Global Search Interactive Pill Bar */}
            <div className="max-w-2xl mx-auto pt-2">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">Popular:</span>
                {quickPills.map((pill) => (
                  <Link
                    key={pill.name}
                    href={pill.href}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-muted/80 hover:bg-primary/10 hover:text-primary text-foreground border border-border transition-colors"
                  >
                    {pill.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Optional Top Ad Slot */}
        <div className="container max-w-5xl">
          <TopAdSlot />
        </div>

        {/* Popular Tools Section */}
        <section className="container max-w-5xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Popular & Trending Utilities
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Our most frequently used calculators and developer utilities.
              </p>
            </div>
            <Link
              href="/calculators"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View All Tools ({TOOL_LIST.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Category Explorer Grid */}
        <section className="container max-w-5xl space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Explore by Category
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Browse high-precision tools organized across 7 core domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORY_LIST.map((category) => {
              const toolCount = TOOL_LIST.filter((t) => t.category === category.id).length;
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  toolCount={toolCount}
                />
              );
            })}
          </div>
        </section>

        {/* Educational Guides & Articles Section */}
        <section className="container max-w-5xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Helpful Guides & Formulas
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Deep mathematical explanations, formulas, and step-by-step walkthroughs.
              </p>
            </div>
            <Link
              href="/guides"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block rounded-xl border border-border/80 bg-card p-5 hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold text-primary uppercase text-[10px]">
                      {CATEGORIES[guide.category]?.shortName || guide.category}
                    </span>
                    <span>{guide.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-border mt-4 flex items-center text-xs font-semibold text-primary gap-1 group-hover:underline">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Full Guide</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why NexusTools Feature Matrix */}
        <section className="container max-w-5xl">
          <div className="rounded-2xl border border-border bg-muted/30 p-8 md:p-12 space-y-8">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Built for Speed, Accuracy & Absolute Privacy
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Everything you need to compute, convert, and format without the bloat.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Instant Calculations</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All calculation engines execute immediately in your browser with zero server latency or round-trips.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Zero-Leakage Privacy</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sensitive payloads like passwords, hashes, Base64 strings, and JSON never leave your device.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-foreground">Mathematically Verified</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every formula is peer-reviewed, tested with automated test suites, and includes worked step-by-step arithmetic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Homepage Detailed Overview & Methodology */}
        <section className="container max-w-5xl space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Free Online Tools That Just Work — Simple, Private & Fast
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              How NexusTools delivers mathematically verified online utilities for students, engineers, and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-foreground">Client-Side Computation Guarantee</h3>
              <p>
                Unlike traditional online utility websites that transmit your data to remote backend servers, NexusTools executes calculation algorithms directly inside your web browser. When you format JSON, generate cryptographic passwords, decode Base64 strings, or compute complex financial loan amortizations, your data remains 100% on your personal device.
              </p>
              <p>
                This architecture eliminates network latency, guarantees sub-millisecond calculation speeds, and ensures complete privacy for sensitive personal and business information.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-foreground">Verified Mathematical Precision</h3>
              <p>
                Every calculator and converter on NexusTools is developed following standard international unit specifications (BIPM SI units, IEEE 754 floating-point standards, RFC network standards). All logic engines are backed by automated unit test suites covering edge cases, rounding precision, and large numbers.
              </p>
              <p>
                Each tool page includes transparent formulas, step-by-step worked arithmetic examples, and common practical use cases so you can verify calculations with complete confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Homepage Frequently Asked Questions */}
        <section className="container max-w-5xl space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Common questions about our online calculators, privacy, and formula accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-border bg-card space-y-2">
              <h3 className="text-sm font-bold text-foreground">Is NexusTools completely free to use?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. All 34 calculators, unit converters, network utilities, and text tools are 100% free with unlimited usage. There are no paywalls, subscriptions, or forced account registrations.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card space-y-2">
              <h3 className="text-sm font-bold text-foreground">Are my inputs or passwords stored on a server?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No. All calculations, cryptography hashing, Base64 encoding, and password generation happen purely inside your browser using modern Web APIs. We do not store or transmit your tool inputs.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card space-y-2">
              <h3 className="text-sm font-bold text-foreground">How accurate are the financial and math calculators?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All algorithms are tested with automated unit test suites for high mathematical accuracy. We provide full formulas and step-by-step arithmetic so you can review each step of the calculation.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card space-y-2">
              <h3 className="text-sm font-bold text-foreground">Do these tools work on mobile smartphones?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Yes. NexusTools is designed mobile-first with touch-friendly input fields, instant copy buttons, and responsive layouts that adapt seamlessly to iPhones, Android devices, tablets, and desktops.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
