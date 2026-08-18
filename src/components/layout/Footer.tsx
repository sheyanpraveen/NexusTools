import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Layers, ShieldCheck, Heart } from "lucide-react";
import { CATEGORY_LIST } from "@/lib/registry/categories";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-muted/20 text-foreground transition-colors mt-16">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>100% Client-Side Privacy for Developer & Security Tools</span>
            </div>
          </div>

          {/* Categories Col 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Calculators & Converters
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/calculators" className="hover:text-foreground transition-colors">
                  Calculators Hub
                </Link>
              </li>
              <li>
                <Link href="/calculators/percentage-calculator" className="hover:text-foreground transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/discount-calculator" className="hover:text-foreground transition-colors">
                  Discount Calculator
                </Link>
              </li>
              <li>
                <Link href="/converters" className="hover:text-foreground transition-colors">
                  Unit Converters
                </Link>
              </li>
              <li>
                <Link href="/converters/length-converter" className="hover:text-foreground transition-colors">
                  Length Converter
                </Link>
              </li>
              <li>
                <Link href="/converters/weight-converter" className="hover:text-foreground transition-colors">
                  Weight Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Tech & Utilities
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/technology" className="hover:text-foreground transition-colors">
                  Technology Tools
                </Link>
              </li>
              <li>
                <Link href="/technology/subnet-calculator" className="hover:text-foreground transition-colors">
                  Subnet Calculator
                </Link>
              </li>
              <li>
                <Link href="/technology/json-formatter" className="hover:text-foreground transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/technology/password-generator" className="hover:text-foreground transition-colors">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/finance/loan-calculator" className="hover:text-foreground transition-colors">
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link href="/text-tools/word-counter" className="hover:text-foreground transition-colors">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-foreground transition-colors">
                  Guides & Tutorials
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About NexusTools
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-foreground transition-colors">
                  Calculation Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-foreground transition-colors">
                  Editorial Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} {siteConfig.name}. All calculations provided for informational purposes.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted for high performance & accuracy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
