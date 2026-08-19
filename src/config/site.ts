const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexustools.io";
const cleanDomain = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

export const siteConfig = {
  name: "NexusTools",
  shortName: "NexusTools",
  domain: cleanDomain,
  url: siteUrl,
  description: "Fast, accurate, and free online calculators, unit converters, date/time tools, technology utilities, and productivity apps.",
  ogImage: `${siteUrl}/og-image.png`,
  twitterHandle: "@NexusToolsIO",
  author: {
    name: "NexusTools Engineering Team",
    url: "https://nexustools.io/about",
    email: "contact@nexustools.io",
  },
  editorialReviewer: {
    name: "Dr. Sarah Jenkins",
    role: "Lead Computational Reviewer & Applied Mathematician",
  },
  links: {
    github: "https://github.com/nexustools",
    twitter: "https://twitter.com/nexustools",
  },
  ads: {
    enabled: false, // Disabled to hide empty placeholder boxes until AdSense approves the account
    client: "ca-pub-2560127169556607",
  },
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID || "G-1ZBL4TMD9X",
  },
};

export type SiteConfig = typeof siteConfig;
