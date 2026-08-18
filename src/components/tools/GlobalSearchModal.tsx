"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Command, ArrowRight } from "lucide-react";
import { TOOL_LIST } from "@/lib/registry/tools";
import { CATEGORIES } from "@/lib/registry/categories";
import * as Icons from "lucide-react";

export function GlobalSearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom event or parent
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search logic across tool name, category, keywords, synonyms, shortDescription
  const filteredTools = cleanQuery
    ? TOOL_LIST.filter((tool) => {
        const inName = tool.name.toLowerCase().includes(cleanQuery);
        const inCategory = tool.category.toLowerCase().includes(cleanQuery);
        const inKeywords = tool.keywords.some((kw) => kw.toLowerCase().includes(cleanQuery));
        const inSynonyms = tool.synonyms?.some((syn) => syn.toLowerCase().includes(cleanQuery));
        const inDesc = tool.shortDescription.toLowerCase().includes(cleanQuery);

        // Split query words for multi-word queries like "kg pounds" or "ip subnet"
        const queryWords = cleanQuery.split(/\s+/);
        const allWordsMatch = queryWords.every(
          (w) =>
            tool.name.toLowerCase().includes(w) ||
            tool.keywords.some((kw) => kw.toLowerCase().includes(w)) ||
            tool.category.toLowerCase().includes(w)
        );

        return inName || inCategory || inKeywords || inSynonyms || inDesc || allWordsMatch;
      }).slice(0, 8)
    : TOOL_LIST.filter((t) => t.isPopular).slice(0, 6);

  const handleSelect = (category: string, slug: string) => {
    onClose();
    router.push(`/${category}/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-sm animate-in fade-in-0 duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Global Tool Search"
      >
        <div className="flex items-center border-b border-border px-4 py-3 bg-muted/20">
          <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators, converters, developer tools..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded text-muted-foreground hover:text-foreground"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredTools.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <p>No tools found matching &quot;{query}&quot;</p>
              <p className="text-xs mt-1 text-muted-foreground/70">
                Try searching for &quot;percentage&quot;, &quot;loan&quot;, &quot;subnet&quot;, &quot;base64&quot;, or &quot;age&quot;
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {cleanQuery ? "Search Results" : "Popular Tools"}
              </div>
              {filteredTools.map((tool) => {
                const IconComp = (Icons as any)[tool.iconName] || Icons.Wrench;
                const catName = CATEGORIES[tool.category]?.shortName || tool.category;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelect(tool.category, tool.slug)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted text-left transition-colors group focus:bg-muted focus:outline-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {tool.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {tool.shortDescription}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="text-[11px] font-medium bg-muted-foreground/10 text-muted-foreground px-2 py-0.5 rounded">
                        {catName}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 bg-muted/30 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">Esc</kbd> to close
            </span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <span>Powered by NexusTools</span>
          </div>
        </div>
      </div>
    </div>
  );
}
