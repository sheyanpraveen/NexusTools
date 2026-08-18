import { notFound } from "next/navigation";
import { Metadata } from "next";
import { TOOL_LIST, getToolBySlug } from "@/lib/registry/tools";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { ToolRenderer } from "@/components/tools/implementations/ToolRenderer";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return TOOL_LIST.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool || tool.category !== params.category) {
    return { title: "Tool Not Found" };
  }

  const url = `${siteConfig.url}/${tool.category}/${tool.slug}`;

  return {
    title: tool.title,
    description: tool.metaDescription,
    keywords: tool.keywords,
    authors: [{ name: tool.author.name }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      url,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.metaDescription,
      creator: siteConfig.twitterHandle,
    },
  };
}

export default function ToolPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const tool = getToolBySlug(params.slug);

  if (!tool || tool.category !== params.category) {
    notFound();
  }

  return (
    <ToolLayout tool={tool}>
      <ToolRenderer tool={tool} />
    </ToolLayout>
  );
}
