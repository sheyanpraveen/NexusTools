export type CategorySlug =
  | "calculators"
  | "converters"
  | "date-time"
  | "technology"
  | "text-tools"
  | "finance"
  | "productivity";

export interface ToolCategory {
  id: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  iconName: string;
  featuredTools: string[]; // Tool slugs
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface WorkedExample {
  title: string;
  scenario: string;
  inputs: Record<string, string | number | boolean>;
  steps: string[];
  result: string;
}

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  shortDescription: string;
  description: string;
  keywords: string[];
  synonyms?: string[];
  title: string;
  metaDescription: string;
  iconName: string;
  status: "published" | "draft";
  seoPriority: number; // 0 to 100
  isPopular?: boolean;
  isFeatured?: boolean;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  reviewer: {
    name: string;
    role: string;
  };
  lastUpdated: string;
  formula?: {
    latex?: string;
    text: string;
    explanation: string;
  };
  workedExamples: WorkedExample[];
  howItWorks: string[];
  useCases: string[];
  faq: FAQItem[];
  relatedToolSlugs: string[];
  relatedGuideSlugs?: string[];
}

export interface GuideItem {
  slug: string;
  title: string;
  metaDescription: string;
  category: CategorySlug;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    bullets?: string[];
    formula?: string;
    example?: string;
  }[];
  relatedToolSlugs: string[];
}

export interface SearchResult {
  slug: string;
  name: string;
  category: CategorySlug;
  categoryName: string;
  shortDescription: string;
  iconName: string;
  score: number;
}
