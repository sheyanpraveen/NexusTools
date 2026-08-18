import { GuideItem } from "@/types/tool";

export const GUIDES: Record<string, GuideItem> = {
  "how-to-calculate-percentage": {
    slug: "how-to-calculate-percentage",
    title: "How to Calculate Percentages: The Ultimate Step-by-Step Guide with Formulas",
    metaDescription: "Master percentage calculations: find percentages of numbers, calculate percentage increase and decrease, and understand common math pitfalls.",
    category: "calculators",
    readTime: "6 min read",
    publishedAt: "2026-01-10",
    updatedAt: "2026-02-15",
    author: "NexusTools Applied Mathematics Group",
    summary: "A complete guide to understanding percentages, decimal conversions, percentage differences, and everyday real-world applications like tips and discounts.",
    sections: [
      {
        heading: "What is a Percentage?",
        content:
          "The word 'percent' comes from the Latin 'per centum', meaning 'by the hundred'. A percentage is simply a ratio or fraction expressed with a denominator of 100. For example, 45% represents 45 parts out of every 100, which is equal to the fraction 45/100 or the decimal 0.45.",
      },
      {
        heading: "The Universal Percentage Formula",
        content:
          "To find what percentage a part is of a whole, divide the part by the total whole and multiply the result by 100.",
        formula: "Percentage (%) = (Part / Total) × 100",
        example: "If you answered 18 questions correctly on a 20-question test: (18 / 20) × 100 = 0.90 × 100 = 90%.",
      },
      {
        heading: "Calculating Percentage Increase vs. Decrease",
        content:
          "Percentage change measures relative growth or reduction compared to an original baseline. The key rule is always dividing the change by the ORIGINAL value, never the new value.",
        bullets: [
          "Percentage Increase = ((New - Old) / Old) × 100",
          "Percentage Decrease = ((Old - New) / Old) × 100",
          "If a price jumps from $50 to $75: ((75 - 50) / 50) × 100 = (25 / 50) × 100 = +50% increase.",
        ],
      },
      {
        heading: "Common Real-World Pitfalls to Avoid",
        content:
          "A frequent mistake is stacking percentages incorrectly. For example, if an item is marked down by 20%, and then has an extra 20% coupon applied, the total discount is NOT 40%. The second 20% applies to the discounted 80% price, resulting in an effective 36% discount overall.",
      },
    ],
    relatedToolSlugs: [
      "percentage-calculator",
      "percentage-increase-calculator",
      "percentage-decrease-calculator",
      "discount-calculator",
    ],
  },

  "how-to-calculate-compound-interest": {
    slug: "how-to-calculate-compound-interest",
    title: "Understanding Compound Interest: How Money Grows Over Time",
    metaDescription: "Learn how compound interest accelerates investment growth over simple interest. Includes formulas, examples, and the Rule of 72.",
    category: "finance",
    readTime: "8 min read",
    publishedAt: "2026-01-15",
    updatedAt: "2026-02-14",
    author: "NexusTools Financial Modeling Group",
    summary: "Explore the mathematics of compound interest, understand compounding frequencies (monthly vs annual), and discover how regular deposits amplify long-term wealth.",
    sections: [
      {
        heading: "Simple vs. Compound Interest",
        content:
          "Simple interest earns a fixed return solely on the initial principal. In contrast, compound interest generates earnings on both the initial principal AND on previously accumulated interest. This creates an exponential growth curve over long time horizons.",
      },
      {
        heading: "The Compound Interest Formula",
        content:
          "The future value of an investment compounded periodically is calculated with the standard financial equation:",
        formula: "A = P(1 + r/n)^(nt)",
        bullets: [
          "A = Future balance amount",
          "P = Initial principal balance",
          "r = Annual interest rate (in decimal format, e.g. 0.07 for 7%)",
          "n = Compounding frequency per year (e.g. 12 for monthly, 365 for daily)",
          "t = Number of years",
        ],
      },
      {
        heading: "The Power of Regular Monthly Contributions",
        content:
          "Adding even modest recurring monthly contributions significantly boosts final portfolio value due to the velocity of compounding. For example, investing $200 per month at 8% annual return yields over $118,000 in 20 years on just $48,000 of personal deposits.",
      },
      {
        heading: "The Rule of 72 Quick Calculation",
        content:
          "To quickly estimate how many years it will take to double your investment, divide 72 by your annual interest rate. At 9% return, 72 / 9 = 8 years to double your money.",
      },
    ],
    relatedToolSlugs: [
      "compound-interest-calculator",
      "simple-interest-calculator",
      "loan-calculator",
    ],
  },

  "how-to-calculate-subnets-and-cidr": {
    slug: "how-to-calculate-subnets-and-cidr",
    title: "How to Subnet IPv4: A Practical Guide to CIDR, Masks & Host Ranges",
    metaDescription: "Learn how to calculate IPv4 subnets, understand CIDR slash notation, and determine network/broadcast addresses step-by-step.",
    category: "technology",
    readTime: "10 min read",
    publishedAt: "2026-01-20",
    updatedAt: "2026-02-15",
    author: "NexusTools Network Infrastructure Team",
    summary: "Demystify binary subnetting, CIDR notation (/24, /28), wildcard masks, and host capacity calculations for networking exams and cloud VPC design.",
    sections: [
      {
        heading: "Why Do We Subnet?",
        content:
          "Subnetting partitions a large physical or virtual network into smaller, logically organized subnetworks. This improves network security, reduces broadcast traffic congestion, and efficiently allocates limited IPv4 address spaces.",
      },
      {
        heading: "Understanding 32-Bit Binary Structure",
        content:
          "Every IPv4 address contains 32 bits arranged in 4 octets of 8 bits each (e.g. 192.168.1.1). The subnet mask indicates how many of those 32 bits belong to the Network ID, with the remaining bits reserved for Host IDs.",
        formula: "Usable Hosts = 2^(Host Bits) - 2 = 2^(32 - CIDR) - 2",
      },
      {
        heading: "Why Subtract 2 Addresses?",
        content:
          "In every standard IPv4 subnet: (1) The first address (all host bits = 0) is reserved as the Network Identifier. (2) The last address (all host bits = 1) is reserved as the Subnet Broadcast Identifier. Devices cannot be assigned either of these two addresses.",
      },
      {
        heading: "Common CIDR Subnet Cheat Sheet",
        content:
          "Key subnet masks to memorize: /24 = 255.255.255.0 (254 hosts), /28 = 255.255.255.240 (14 hosts), /30 = 255.255.255.252 (2 point-to-point hosts).",
      },
    ],
    relatedToolSlugs: [
      "subnet-calculator",
      "cidr-calculator",
      "ip-address-checker",
    ],
  },
};

export const GUIDE_LIST = Object.values(GUIDES);

export function getGuideBySlug(slug: string): GuideItem | undefined {
  return GUIDES[slug];
}
