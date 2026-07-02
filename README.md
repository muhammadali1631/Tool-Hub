# ToolHub - 20 Free Online Tools

A collection of 20+ free online tools built with Next.js. Tools include text processing, unit conversion, code generation, calculations, and more. All processing happens client-side — no data is ever sent to a server.

## Features

- **20+ Free Tools** — Word counter, QR code generator, password generator, currency converter, calculators, and more.
- **Client-Side Processing** — All computation runs in the browser. Your data never leaves your device.
- **No Registration Required** — Every tool is immediately accessible without sign-up.
- **Responsive Design** — Works on desktop, tablet, and mobile.
- **Dark Mode** — Light and dark theme support with system preference detection.
- **Search** — Instant tool search with suggestions in the navbar, hero section, and tools page.
- **SEO Optimized** — Structured data (JSON-LD), canonical URLs, Open Graph, sitemap, robots.txt.

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Fonts** — Geist (by Vercel)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Project Structure

```
app/                          # Next.js App Router pages
├── (tools)/                  # Category route group
│   ├── text-tools/
│   ├── converter-tools/
│   ├── generator-tools/
│   └── calculator-tools/
├── about/
├── contact/
├── privacy/
├── terms/
├── tools/
│   └── [slug]/               # Individual tool pages
├── layout.tsx                # Root layout with SEO metadata
├── page.tsx                  # Homepage
├── sitemap.ts
└── robots.ts
components/
├── home/                     # Homepage-specific components
├── layout/                   # Navbar, Footer, Container, ThemeProvider
├── seo/                      # JsonLd helper
├── tools/                    # ToolCard, FAQ, Breadcrumb, ToolSearch, etc.
└── ui/                       # Reusable UI primitives (Button, Input, Badge, etc.)
data/
├── tools.ts                  # Tool definitions with SEO metadata
└── categories.ts
public/
├── favicon.ico
└── og-image.png              # Open Graph image for social sharing
```

## Adding a New Tool

1. Add a tool definition to `data/tools.ts` with name, slug, description, keywords, SEO metadata, FAQ, how-to steps, features, and benefits.
2. Create a tool component in `components/tools/` following the existing pattern.
3. Add the tool's route rendering in `app/tools/[slug]/page.tsx` via `ToolRenderer`.
