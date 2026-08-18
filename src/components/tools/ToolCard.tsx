import Link from "next/link";
import { ToolItem } from "@/types/tool";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import * as Icons from "lucide-react";

export function ToolCard({ tool }: { tool: ToolItem }) {
  // Dynamic icon resolution
  const IconComponent = (Icons as any)[tool.iconName] || Icons.Wrench;

  return (
    <Link href={`/${tool.category}/${tool.slug}`} className="group block focus:outline-none">
      <Card className="h-full border-border/80 bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 group-focus-visible:ring-2 group-focus-visible:ring-primary flex flex-col justify-between">
        <CardHeader className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
              <IconComponent className="w-5 h-5" />
            </div>
            {tool.isPopular && (
              <Badge variant="default" className="text-[10px] uppercase font-bold">
                Popular
              </Badge>
            )}
          </div>
          <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {tool.name}
          </CardTitle>
          <CardDescription className="text-xs line-clamp-2 mt-1 text-muted-foreground">
            {tool.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-4 pt-0">
          <div className="flex items-center text-xs font-medium text-primary group-hover:underline gap-1">
            <span>Use Tool</span>
            <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
