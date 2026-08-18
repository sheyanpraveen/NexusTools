import Link from "next/link";
import { ToolCategory } from "@/types/tool";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import * as Icons from "lucide-react";

export function CategoryCard({ category, toolCount }: { category: ToolCategory; toolCount: number }) {
  const IconComponent = (Icons as any)[category.iconName] || Icons.Folder;

  return (
    <Link href={`/${category.id}`} className="group block focus:outline-none">
      <Card className="h-full border-border/80 bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 group-focus-visible:ring-2 group-focus-visible:ring-primary">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              {toolCount} {toolCount === 1 ? "Tool" : "Tools"}
            </span>
          </div>
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
            {category.name}
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1.5">
            {category.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
