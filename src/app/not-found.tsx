import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getPopularTools } from "@/lib/registry/tools";
import { ToolCard } from "@/components/tools/ToolCard";
import { FileQuestion, Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  const popularTools = getPopularTools().slice(0, 4);

  return (
    <div className="container max-w-4xl py-16 md:py-24 text-center space-y-10">
      <div className="space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Tool Not Found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page or calculation utility you are looking for may have been moved, renamed, or is currently undergoing maintenance.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" className="gap-2">
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Suggested Popular Tools */}
      <div className="pt-8 border-t border-border text-left space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">
            Popular Online Utilities You Might Find Useful:
          </h2>
          <Link href="/calculators" className="text-xs text-primary hover:underline font-semibold flex items-center gap-1">
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
