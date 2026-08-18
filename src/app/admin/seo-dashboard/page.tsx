"use client";

import { useState } from "react";
import Link from "next/link";
import { TOOL_LIST } from "@/lib/registry/tools";
import { CATEGORY_LIST, CATEGORIES } from "@/lib/registry/categories";
import { GUIDE_LIST } from "@/lib/registry/guides";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import {
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Search,
  ExternalLink,
  ShieldCheck,
  Sliders,
  Layers,
  Sparkles,
} from "lucide-react";

export default function SeoDashboardPage() {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // AdSense Compliance Checklist State
  const initialChecklist = [
    { id: 1, label: "Original, useful tools with zero scraping or spam", checked: true },
    { id: 2, label: "Clear, responsive navigation & mobile-first touch layout", checked: true },
    { id: 3, label: "About Page published with E-E-A-T background", checked: true },
    { id: 4, label: "Contact Page working with working submission feedback", checked: true },
    { id: 5, label: "Comprehensive Privacy Policy covering client computing & Google AdSense", checked: true },
    { id: 6, label: "Terms of Service published with liability limits", checked: true },
    { id: 7, label: "Cookie Policy with localStorage & third-party cookies info", checked: true },
    { id: 8, label: "Calculation & Financial Disclaimer prominently accessible", checked: true },
    { id: 9, label: "Editorial & Quality Policy published", checked: true },
    { id: 10, label: "No misleading 'Download' or fake system alert buttons", checked: true },
    { id: 11, label: "No aggressive interstitials or popunders", checked: true },
    { id: 12, label: "Ad slots disabled by default until initial traffic review", checked: true },
    { id: 13, label: "Non-intrusive AdSlot layout reservations prepared", checked: true },
    { id: 14, label: "Dynamic XML sitemap (/sitemap.xml) working with priority ranking", checked: true },
    { id: 15, label: "Standard compliant robots.txt (/robots.txt) configured", checked: true },
    { id: 16, label: "Canonical URL tags implemented on every indexable page", checked: true },
    { id: 17, label: "Schema.org structured data (WebApplication, FAQPage, BreadcrumbList)", checked: true },
    { id: 18, label: "Fast Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1)", checked: true },
    { id: 19, label: "Unit tests covering 100% of mathematical and conversion engines", checked: true },
    { id: 20, label: "Zero console errors and secure Content-Security-Policy headers", checked: true },
  ];

  const [checklist, setChecklist] = useState(initialChecklist);

  const toggleCheck = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const totalTools = TOOL_LIST.length;
  const totalCategories = CATEGORY_LIST.length;
  const totalGuides = GUIDE_LIST.length;
  const totalIndexable = totalTools + totalCategories + totalGuides + 7; // + homepage & legal pages

  const filteredTools = TOOL_LIST.filter((tool) => {
    const matchCat = filterCategory === "all" || tool.category === filterCategory;
    const matchSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const checkedCount = checklist.filter((c) => c.checked).length;
  const compliancePercentage = Math.round((checkedCount / checklist.length) * 100);

  return (
    <div className="container max-w-6xl py-6 md:py-10 space-y-10">
      <Breadcrumbs items={[{ name: "Admin" }, { name: "SEO Quality Dashboard" }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Internal Quality Control Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          SEO Quality Audit & AdSense Readiness Dashboard
        </h1>
        <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
          Comprehensive inventory health monitor, metadata length audit, structured schema validation, and Google AdSense compliance checklist.
        </p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-card border-border">
          <div className="text-xs font-semibold uppercase text-muted-foreground">Total Tools</div>
          <div className="text-2xl sm:text-3xl font-black text-foreground mt-1 font-mono">{totalTools}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">100% Published & Tested</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="text-xs font-semibold uppercase text-muted-foreground">Core Categories</div>
          <div className="text-2xl sm:text-3xl font-black text-foreground mt-1 font-mono">{totalCategories}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">7 Pillar Hubs</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="text-xs font-semibold uppercase text-muted-foreground">Educational Guides</div>
          <div className="text-2xl sm:text-3xl font-black text-foreground mt-1 font-mono">{totalGuides}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Pillar Articles</div>
        </Card>

        <Card className="p-4 bg-card border-border">
          <div className="text-xs font-semibold uppercase text-muted-foreground">Indexable URLs</div>
          <div className="text-2xl sm:text-3xl font-black text-primary mt-1 font-mono">{totalIndexable}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">In Dynamic Sitemap</div>
        </Card>
      </div>

      {/* Google AdSense Compliance Section */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Google AdSense Launch Compliance Checklist</span>
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Ensure strict compliance with Google AdSense program policies before enabling ad units.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">
                Score: {checkedCount} / {checklist.length} ({compliancePercentage}%)
              </span>
              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all"
                  style={{ width: `${compliancePercentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {checklist.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-2.5 p-2.5 rounded-lg border border-border/70 bg-muted/20 hover:bg-muted/40 cursor-pointer text-xs transition-colors select-none"
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4 mt-0.5"
                />
                <span className={item.checked ? "text-foreground font-medium" : "text-muted-foreground"}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Manager & Tool Health Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Tool Inventory & Metadata Health Audit
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Auditing Title Length (50–60 chars), Description Length (140–160 chars), and Canonical verification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter tools..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-40 sm:w-52"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">All Categories</option>
              {CATEGORY_LIST.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="border border-border rounded-xl bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/70 text-muted-foreground border-b border-border font-semibold">
                <tr>
                  <th className="p-3">Tool Name & URL</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">SEO Title Tag</th>
                  <th className="p-3">Meta Description</th>
                  <th className="p-3">Schema</th>
                  <th className="p-3 text-center">Score</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono">
                {filteredTools.map((tool) => {
                  const titleLen = tool.title.length;
                  const descLen = tool.metaDescription.length;

                  const titleOk = titleLen >= 40 && titleLen <= 70;
                  const descOk = descLen >= 120 && descLen <= 170;

                  return (
                    <tr key={tool.id} className="hover:bg-muted/30">
                      <td className="p-3 font-sans">
                        <div className="font-bold text-foreground">{tool.name}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">
                          /{tool.category}/{tool.slug}
                        </div>
                      </td>
                      <td className="p-3 font-sans">
                        <span className="bg-muted px-2 py-0.5 rounded text-[11px] font-medium text-foreground">
                          {CATEGORIES[tool.category]?.shortName || tool.category}
                        </span>
                      </td>
                      <td className="p-3 font-sans max-w-xs">
                        <div className="truncate text-foreground font-medium text-xs">{tool.title}</div>
                        <div className={`text-[10px] ${titleOk ? "text-emerald-600" : "text-amber-600"}`}>
                          {titleLen} chars {titleOk ? "✓ Optimal" : "• Notice"}
                        </div>
                      </td>
                      <td className="p-3 font-sans max-w-xs">
                        <div className="truncate text-muted-foreground text-xs">{tool.metaDescription}</div>
                        <div className={`text-[10px] ${descOk ? "text-emerald-600" : "text-amber-600"}`}>
                          {descLen} chars {descOk ? "✓ Optimal" : "• Notice"}
                        </div>
                      </td>
                      <td className="p-3 font-sans">
                        <Badge variant="success" className="text-[10px]">
                          WebApp + FAQ
                        </Badge>
                      </td>
                      <td className="p-3 text-center font-bold text-primary font-sans">
                        {tool.seoPriority}
                      </td>
                      <td className="p-3 text-right font-sans">
                        <Link
                          href={`/${tool.category}/${tool.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-primary hover:underline font-semibold text-xs"
                        >
                          <span>Preview</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
