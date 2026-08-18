"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Layers } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";
import { GlobalSearchModal } from "@/components/tools/GlobalSearchModal";
import { CATEGORY_LIST } from "@/lib/registry/categories";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Calculators", href: "/calculators" },
    { name: "Converters", href: "/converters" },
    { name: "Finance", href: "/finance" },
    { name: "Date & Time", href: "/date-time" },
    { name: "Technology", href: "/technology" },
    { name: "Text Tools", href: "/text-tools" },
    { name: "Guides", href: "/guides" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                <Layers className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {siteConfig.name}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors hover:text-foreground ${
                      isActive ? "text-primary font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 h-9 px-3 rounded-lg border border-input bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground text-xs transition-colors focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Search tools"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-background border border-border font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-background px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-2">
              Categories
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORY_LIST.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm rounded-lg hover:bg-muted text-foreground transition-colors font-medium"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/guides"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm rounded-lg hover:bg-muted text-primary transition-colors font-semibold"
              >
                Guides & Tutorials
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command/Search Modal */}
      <GlobalSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
