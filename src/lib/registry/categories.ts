import { ToolCategory } from "@/types/tool";

export const CATEGORIES: Record<string, ToolCategory> = {
  calculators: {
    id: "calculators",
    name: "Calculators",
    shortName: "Calculators",
    description: "Accurate math, percentage, discount, and statistical calculators.",
    longDescription:
      "Explore our suite of high-precision mathematical and everyday calculators. From finding percentages and markups to computing complex statistical averages, our tools run instantly in your browser with step-by-step formula breakdowns.",
    iconName: "Calculator",
    featuredTools: [
      "percentage-calculator",
      "percentage-increase-calculator",
      "discount-calculator",
      "average-calculator",
      "ratio-calculator",
    ],
  },
  finance: {
    id: "finance",
    name: "Finance Tools",
    shortName: "Finance",
    description: "Loan amortization, simple & compound interest, and investment calculators.",
    longDescription:
      "Make informed financial decisions with our transparent mathematical tools. Calculate compound growth, evaluate mortgage and loan payment schedules, and analyze simple interest without signing up or exposing personal financial data.",
    iconName: "DollarSign",
    featuredTools: [
      "compound-interest-calculator",
      "loan-calculator",
      "simple-interest-calculator",
    ],
  },
  converters: {
    id: "converters",
    name: "Unit Converters",
    shortName: "Converters",
    description: "Instant conversion between imperial and metric units for length, weight, temperature, and data.",
    longDescription:
      "Convert seamlessly across global measurement systems. Our unit conversion engines provide bi-directional transformations for length, mass, temperature, and digital storage with exact mathematical precision.",
    iconName: "ArrowRightLeft",
    featuredTools: [
      "length-converter",
      "weight-converter",
      "temperature-converter",
      "data-storage-converter",
    ],
  },
  "date-time": {
    id: "date-time",
    name: "Date & Time Utilities",
    shortName: "Date & Time",
    description: "Age calculations, calendar duration differences, business days, and Unix timestamps.",
    longDescription:
      "Effortlessly compute date spans, exact chronologic age down to the minute, working business days excluding weekends, and convert Unix epoch timestamps across all global timezones.",
    iconName: "CalendarClock",
    featuredTools: [
      "age-calculator",
      "date-difference-calculator",
      "days-between-dates",
      "unix-timestamp-converter",
      "timezone-converter",
    ],
  },
  technology: {
    id: "technology",
    name: "Technology & Developer Tools",
    shortName: "Technology",
    description: "Subnetting & CIDR calculators, Base64, JSON formatter, UUID, passwords, and cryptography.",
    longDescription:
      "High-utility tools built specifically for software engineers, network administrators, and sysadmins. All cryptographic hashing, Base64 encoding, JSON validation, and password generation happen 100% client-side for absolute privacy.",
    iconName: "Terminal",
    featuredTools: [
      "subnet-calculator",
      "cidr-calculator",
      "json-formatter",
      "base64-encoder-decoder",
      "password-generator",
      "uuid-generator",
      "hash-generator",
      "ip-address-checker",
    ],
  },
  "text-tools": {
    id: "text-tools",
    name: "Text & Writing Utilities",
    shortName: "Text Tools",
    description: "Word counters, readability & speaking time estimators, case converters, and text diffing.",
    longDescription:
      "Streamline your writing and coding workflow. Analyze character and word density, convert case formats (camelCase, snake_case, Title Case), compare text revisions, and generate clean URL slugs with zero delay.",
    iconName: "FileText",
    featuredTools: [
      "word-counter",
      "character-counter",
      "case-converter",
      "text-diff-compare",
      "slug-generator",
    ],
  },
  productivity: {
    id: "productivity",
    name: "Productivity Tools",
    shortName: "Productivity",
    description: "Focus Pomodoro timers, high-res QR code generators, stopwatches, and utility counters.",
    longDescription:
      "Boost daily efficiency with focused productivity utilities. Generate vector and PNG QR codes, run distraction-free Pomodoro study intervals with audio cues, and measure elapsed time accurately.",
    iconName: "CheckSquare",
    featuredTools: ["pomodoro-timer", "qr-code-generator"],
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
