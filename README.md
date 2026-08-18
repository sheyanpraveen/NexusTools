# NexusTools — Production SEO Utility Platform

A high-performance, accessible, and privacy-conscious online utility platform built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Featuring **34 interactive calculation & conversion tools**, **8 pure mathematical engines**, automated **Vitest unit test suites**, Schema.org JSON-LD structured data, dynamic XML sitemaps, and full Google AdSense compliance architecture.

---

## Table of Contents

1. [Quick Start & Local Setup](#1-quick-start--local-setup)
2. [Project Architecture](#2-project-architecture)
3. [Configuration & Branding](#3-configuration--branding)
4. [Environment Variables](#4-environment-variables)
5. [Hosting & Deployment Guides](#5-hosting--deployment-guides)
   - [Option A: Deploying to Vercel (Recommended)](#option-a-deploying-to-vercel-recommended)
   - [Option B: Deploying to a VPS (Ubuntu / Nginx / PM2)](#option-b-deploying-to-a-vps-ubuntu--nginx--pm2)
   - [Option C: Docker Deployment](#option-c-docker-deployment)
6. [Google Search Console & SEO Verification](#6-google-search-console--seo-verification)
7. [Google Analytics 4 (GA4) Setup](#7-google-analytics-4-ga4-setup)
8. [Google AdSense Monetization Activation](#8-google-adsense-monetization-activation)
9. [Internal SEO Quality Dashboard](#9-internal-seo-quality-dashboard)
10. [Testing & Quality Assurance](#10-testing--quality-assurance)

---

## 1. Quick Start & Local Setup

### Prerequisites
- **Node.js**: `v18.17.0` or higher (`v20.x` or `v22.x` recommended)
- **npm**: `v9.x` or higher (or `pnpm` / `yarn`)

### Installation Steps

1. **Clone or Navigate to the Workspace**:
   ```bash
   cd e:/Youtube-Automation/Ad-Sense
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Execute Unit Tests**:
   ```bash
   npm test
   ```

5. **Build and Test Production Bundle Locally**:
   ```bash
   npm run build
   npm start
   ```

---

## 2. Project Architecture

```
src/
├── app/                         # Next.js 14 App Router
│   ├── page.tsx                 # High-converting Homepage with Hero & Search
│   ├── [category]/              # Category Pillar Hubs (/calculators, /converters, etc.)
│   │   └── [slug]/              # Dynamic Tool Pages (/calculators/percentage-calculator)
│   ├── guides/                  # Educational Guides Hub & Pillar Articles
│   ├── admin/seo-dashboard/     # SEO Health & AdSense Audit Dashboard
│   ├── about/, contact/, privacy-policy/, terms/, cookie-policy/, disclaimer/, editorial-policy/
│   ├── sitemap.ts               # Dynamic XML Sitemap (/sitemap.xml)
│   ├── robots.ts                # Crawl Rules (/robots.txt)
│   └── manifest.ts              # PWA Web Manifest
├── components/
│   ├── layout/                  # Navbar, Footer, ThemeToggle
│   ├── tools/                   # ToolLayout, SearchModal, ToolCards, AdSlot
│   │   └── implementations/     # 34 Interactive Tool Components
│   ├── ui/                      # Button, Input, Select, Card, Badge, Breadcrumbs
│   └── seo/                     # JSON-LD Schema Builders
├── config/
│   └── site.ts                  # Central Brand & Site Configuration
├── lib/
│   ├── engines/                 # Pure TypeScript Calculation Algorithms
│   ├── registry/                # Tools, Categories, and Guides Registries
│   └── utils.ts                 # Formatting & Helper functions
└── types/                       # TypeScript Definitions
```

---

## 3. Configuration & Branding

All branding, domain settings, author metadata, and AdSense flags are controlled from a single configuration file: [`src/config/site.ts`](file:///e:/Youtube-Automation/Ad-Sense/src/config/site.ts).

```typescript
// src/config/site.ts
export const siteConfig = {
  name: "NexusTools",                          // Brand Name
  shortName: "NexusTools",
  domain: "yourdomain.com",                    // Your Target Domain
  url: "https://yourdomain.com",               // Canonical Base URL
  description: "Fast, accurate, and free online calculators...",
  author: {
    name: "NexusTools Engineering Team",
    url: "https://yourdomain.com/about",
    email: "contact@yourdomain.com",
  },
  editorialReviewer: {
    name: "Dr. Sarah Jenkins",
    role: "Lead Computational Reviewer & Applied Mathematician",
  },
  ads: {
    enabled: false,                           // Set to 'true' after AdSense approval
    client: "ca-pub-XXXXXXXXXXXXXXXX",        // Your AdSense Publisher ID
  },
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX",
  },
};
```

---

## 4. Environment Variables

Create a `.env.local` file in the project root:

```env
# Production URL (used for canonical tags, OpenGraph, and sitemap generation)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Google Analytics 4 Measurement ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 5. Hosting & Deployment Guides

### Option A: Deploying to Vercel (Recommended)

Vercel provides native zero-configuration hosting for Next.js with automatic global edge caching, SSL, and instant CI/CD.

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of NexusTools SEO utility platform"
   git branch -M main
   git remote add origin https://github.com/your-username/nexustools.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com).
   - Click **"Add New..."** > **"Project"**.
   - Select your GitHub repository.
   - Vercel automatically detects Next.js.
   - Under **Environment Variables**, add:
     - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
     - `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`
   - Click **"Deploy"**.

3. **Configure Custom Domain**:
   - In Vercel Project Settings > **Domains**, add `yourdomain.com` and `www.yourdomain.com`.
   - Update your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) with the DNS records provided by Vercel:
     - `A Record`: `@` -> `76.76.21.21`
     - `CNAME Record`: `www` -> `cname.vercel-dns.com`

---

### Option B: Deploying to a VPS (Ubuntu / Nginx / PM2)

1. **Install Node.js & PM2 on your VPS**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx git
   sudo npm install -g pm2
   ```

2. **Clone & Build**:
   ```bash
   git clone https://github.com/your-username/nexustools.git /var/www/nexustools
   cd /var/www/nexustools
   npm install
   npm run build
   ```

3. **Start Application with PM2**:
   ```bash
   pm2 start npm --name "nexustools" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx Reverse Proxy** (`/etc/nginx/sites-available/nexustools`):
   ```nginx
   server {
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   Enable site and install free SSL certificate:
   ```bash
   sudo ln -s /etc/nginx/sites-available/nexustools /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## 6. Google Search Console & SEO Verification

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add a new **Domain Property** (e.g. `yourdomain.com`).
3. Complete DNS verification via TXT record.
4. Once verified, go to **Sitemaps** in the left sidebar.
5. Enter your sitemap URL: `https://yourdomain.com/sitemap.xml` and click **Submit**.
6. Check `https://yourdomain.com/robots.txt` to confirm crawlers have unrestricted access to public tool pages.

---

## 7. Google Analytics 4 (GA4) Setup

1. Create a GA4 property in [Google Analytics](https://analytics.google.com/).
2. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`).
3. Set the `NEXT_PUBLIC_GA_ID` environment variable in your production deployment.

---

## 8. Google AdSense Monetization Activation

### Pre-Approval Phase (Current State)
The platform is built with strict AdSense policy compliance:
- **100% Original Calculation Tools & Worked Examples**
- **Complete Legal Suite**: `/about`, `/contact`, `/privacy-policy`, `/terms`, `/cookie-policy`, `/disclaimer`, `/editorial-policy`
- **Ad Slots Disabled Initially**: Kept hidden via `siteConfig.ads.enabled = false` to avoid thin/ad-heavy penalties during site review.

### Applying for AdSense:
1. Submit your custom domain to [Google AdSense](https://adsense.google.com/).
2. Add the AdSense site verification snippet to `src/app/layout.tsx` or place `ads.txt` in `public/ads.txt`.
3. Once your account is approved:
   - Open [`src/config/site.ts`](file:///e:/Youtube-Automation/Ad-Sense/src/config/site.ts)
   - Update `siteConfig.ads.client = "ca-pub-YOUR_PUBLISHER_ID"`
   - Set `siteConfig.ads.enabled = true`
   - Re-deploy. Non-intrusive Top, Content, and Bottom ad units will activate seamlessly.

---

## 9. Internal SEO Quality Dashboard

Access the built-in SEO audit suite at:
[http://localhost:3000/admin/seo-dashboard](http://localhost:3000/admin/seo-dashboard) (or `https://yourdomain.com/admin/seo-dashboard`)

Features:
- Live tool inventory & category health audit
- SEO Title tag length validator (50–60 chars)
- Meta description length validator (140–160 chars)
- Schema.org structured data status
- 20-point AdSense launch compliance checklist

---

## 10. Testing & Quality Assurance

Run the automated Vitest test suite anytime:
```bash
npm test
```
All 30 mathematical assertions covering percentages, loans, interest, subnets, converters, crypto entropy, and string transforms will execute in under 1 second.
