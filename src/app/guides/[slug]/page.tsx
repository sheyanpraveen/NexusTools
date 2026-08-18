import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { GUIDE_LIST, getGuideBySlug } from "@/lib/registry/guides";
import { CATEGORIES } from "@/lib/registry/categories";
import { getToolBySlug } from "@/lib/registry/tools";
import { ToolCard } from "@/components/tools/ToolCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GuideJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { ToolItem } from "@/types/tool";
import { Calendar, Clock, User, ArrowRight, BookOpen } from "lucide-react";

export function generateStaticParams() {
  return GUIDE_LIST.map((guide) => ({
    slug: guide.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    return { title: "Guide Not Found" };
  }

  const title = `${guide.title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}/guides/${guide.slug}`;

  return {
    title,
    description: guide.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: guide.metaDescription,
      url,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: [guide.author],
    },
  };
}

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    notFound();
  }

  const category = CATEGORIES[guide.category];
  const relatedTools = guide.relatedToolSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolItem => t !== undefined);

  return (
    <>
      <GuideJsonLd guide={guide} />

      <article className="container max-w-4xl py-6 md:py-10 space-y-8">
        <Breadcrumbs
          items={[
            { name: "Guides", href: "/guides" },
            { name: guide.title },
          ]}
        />

        {/* Article Header */}
        <header className="space-y-4 border-b border-border pb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="font-semibold text-primary uppercase text-[10px] bg-primary/10 px-2.5 py-0.5 rounded">
              {category?.shortName || guide.category}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{guide.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Updated {guide.updatedAt}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>By {guide.author}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {guide.title}
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            {guide.summary}
          </p>
        </header>

        {/* Main Content Sections */}
        <div className="space-y-8 text-foreground leading-relaxed">
          {guide.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {section.heading}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {section.content}
              </p>

              {section.formula && (
                <div className="p-4 rounded-xl bg-muted/50 border border-border font-mono text-sm text-foreground overflow-x-auto my-3">
                  {section.formula}
                </div>
              )}

              {section.example && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs sm:text-sm text-muted-foreground space-y-1">
                  <div className="font-semibold text-primary">Example:</div>
                  <p>{section.example}</p>
                </div>
              )}

              {section.bullets && (
                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-muted-foreground pl-2">
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Related Interactive Calculators */}
        {relatedTools.length > 0 && (
          <section className="space-y-4 pt-8 border-t border-border">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Try the Interactive Calculators Mentioned in This Guide
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
