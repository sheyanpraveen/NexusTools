import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, CATEGORY_LIST } from "@/lib/registry/categories";
import { getToolsByCategory } from "@/lib/registry/tools";
import { GUIDE_LIST } from "@/lib/registry/guides";
import { ToolCard } from "@/components/tools/ToolCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { TopAdSlot, BottomAdSlot } from "@/components/tools/AdSlot";
import * as Icons from "lucide-react";

export function generateStaticParams() {
  return CATEGORY_LIST.map((cat) => ({
    category: cat.id,
  }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = CATEGORIES[params.category];
  if (!category) {
    return { title: "Category Not Found" };
  }

  const title = `Free Online ${category.name} – Fast, Accurate & Private | ${siteConfig.name}`;
  const description = `${category.description} Free, instant, and mobile-friendly ${category.shortName.toLowerCase()} tools with step-by-step formulas.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${category.id}`,
    },
    alternates: {
      canonical: `${siteConfig.url}/${category.id}`,
    },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = CATEGORIES[params.category];
  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.id);
  const relatedGuides = GUIDE_LIST.filter((g) => g.category === category.id);
  const IconComponent = (Icons as any)[category.iconName] || Icons.Folder;

  return (
    <div className="container max-w-5xl py-6 md:py-10 space-y-10">
      <Breadcrumbs items={[{ name: category.name }]} />

      {/* Category Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {category.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {tools.length} Free Online Utilities
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
          {category.longDescription}
        </p>
      </div>

      <TopAdSlot />

      {/* Tools Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            All {category.shortName}
          </h2>
          <span className="text-xs text-muted-foreground font-medium">
            Showing {tools.length} tools
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Related Guides for this Category */}
      {relatedGuides.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-border">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Featured {category.shortName} Guides & Formulas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
              >
                <div className="text-xs text-primary font-semibold uppercase mb-1">
                  {guide.readTime}
                </div>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                  {guide.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <BottomAdSlot />
    </div>
  );
}
