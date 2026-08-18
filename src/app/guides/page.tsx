import { Metadata } from "next";
import Link from "next/link";
import { GUIDE_LIST } from "@/lib/registry/guides";
import { CATEGORIES } from "@/lib/registry/categories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: `Guides, Formulas & Math Tutorials | ${siteConfig.name}`,
  description: "Comprehensive guides, mathematical formulas, and step-by-step calculations for percentages, finance, subnetting, and unit conversions.",
  alternates: {
    canonical: `${siteConfig.url}/guides`,
  },
};

export default function GuidesPage() {
  return (
    <div className="container max-w-5xl py-6 md:py-10 space-y-10">
      <Breadcrumbs items={[{ name: "Guides & Tutorials" }]} />

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Educational Resources</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Calculation Guides & Formulas
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Deep-dive tutorials, real-world examples, mathematical formulas, and cheat sheets to help you master everyday calculations and technical concepts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDE_LIST.map((guide) => {
          const category = CATEGORIES[guide.category];
          return (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block rounded-xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-primary uppercase text-[10px] bg-primary/10 px-2 py-0.5 rounded">
                    {category?.shortName || guide.category}
                  </span>
                  <span>{guide.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-border mt-4 flex items-center justify-between text-xs font-semibold text-primary">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
