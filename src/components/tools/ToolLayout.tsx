import React from "react";
import { ToolItem } from "@/types/tool";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ToolCard } from "@/components/tools/ToolCard";
import { getToolBySlug } from "@/lib/registry/tools";
import { CATEGORIES } from "@/lib/registry/categories";
import { ToolJsonLd } from "@/components/seo/JsonLd";
import { TopAdSlot, ContentAdSlot, BottomAdSlot } from "@/components/tools/AdSlot";
import { ShieldCheck, UserCheck, Calendar, BookOpen, HelpCircle } from "lucide-react";
import * as Icons from "lucide-react";

export interface ToolLayoutProps {
  tool: ToolItem;
  children: React.ReactNode; // The interactive calculator UI
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const category = CATEGORIES[tool.category];
  const IconComponent = (Icons as any)[tool.iconName] || Icons.Wrench;

  const breadcrumbItems = [
    { name: category?.name || tool.category, href: `/${tool.category}` },
    { name: tool.name },
  ];

  const relatedTools = tool.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolItem => t !== undefined);

  return (
    <>
      <ToolJsonLd tool={tool} />

      <div className="container max-w-5xl py-6 md:py-10 space-y-10">
        {/* Navigation Breadcrumb */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Above-the-fold Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="default" className="text-xs font-semibold">
              {category?.shortName || tool.category}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>Updated {tool.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Reviewed by {tool.reviewer.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {tool.name}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-0.5">
                {tool.shortDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Optional Top Ad Placement (Disabled by default) */}
        <TopAdSlot />

        {/* Main Interactive Tool Container (Above the Fold) */}
        <section aria-label={`${tool.name} interactive interface`}>
          {children}
        </section>

        {/* Mid Content Ad Placement (Disabled by default) */}
        <ContentAdSlot />

        {/* Detailed Explanation & Educational Content */}
        <section className="space-y-8 pt-4 border-t border-border">
          {/* Formula & How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.formula && (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span>Formula & Calculation Methodology</span>
                  </div>
                  <CardTitle className="text-base mt-1">Mathematical Formula</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3.5 rounded-lg bg-muted/60 font-mono text-xs sm:text-sm text-foreground overflow-x-auto border border-border">
                    {tool.formula.text}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tool.formula.explanation}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Step-by-Step Instructions</span>
                </div>
                <CardTitle className="text-base mt-1">How to Use This Tool</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-xs sm:text-sm text-muted-foreground list-decimal list-inside leading-relaxed">
                  {tool.howItWorks.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      <span className="text-foreground font-medium">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Worked Examples */}
          {tool.workedExamples && tool.workedExamples.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Worked Examples & Real-World Scenarios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tool.workedExamples.map((ex, idx) => (
                  <Card key={idx} className="bg-card">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold text-foreground">
                        {ex.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">{ex.scenario}</p>
                    </CardHeader>
                    <CardContent className="space-y-2 text-xs">
                      <div className="space-y-1">
                        {ex.steps.map((st, sIdx) => (
                          <div key={sIdx} className="text-muted-foreground">
                            • {st}
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-border flex items-center justify-between font-semibold text-primary">
                        <span>Result:</span>
                        <span className="font-mono">{ex.result}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Common Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Common Use Cases
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                {tool.useCases.map((uc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Frequently Asked Questions Accordion */}
          {tool.faq && tool.faq.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-3">
                {tool.faq.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-border bg-card p-4 space-y-1.5">
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.question}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* E-E-A-T Editorial Review Badge */}
          <div className="p-4 rounded-xl border border-border/80 bg-muted/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground">Editorial Integrity: </span>
              Authored by {tool.author.name} and mathematically verified by {tool.reviewer.name} ({tool.reviewer.role}).
            </div>
            <div className="shrink-0 text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Accuracy</span>
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        {relatedTools.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-border">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Related Calculators & Utilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((relTool) => (
                <ToolCard key={relTool.id} tool={relTool} />
              ))}
            </div>
          </section>
        )}

        {/* Bottom Ad Placement (Disabled by default) */}
        <BottomAdSlot />
      </div>
    </>
  );
}
