import type { Metadata } from "next"
import { tools } from "@/data/tools"
import Container from "@/components/layout/container"
import { Breadcrumb } from "@/components/tools/breadcrumb"
import JsonLd from "@/components/seo/json-ld"
import { ToolSearch } from "@/components/tools/tool-search"

export const metadata: Metadata = {
  title: "All Free Online Tools - 20 Tools Collection | ToolHub",
  description: "Browse our complete collection of free online tools including text tools, converters, generators, and calculators. All tools are free and work in your browser.",
  alternates: { canonical: "https://toolhub.vercel.app/tools" },
  openGraph: {
    title: "All Free Online Tools - ToolHub",
    description: "Browse our complete collection of free online tools.",
    url: "https://toolhub.vercel.app/tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Free Online Tools - ToolHub",
    description: "Browse our complete collection of free online tools.",
  },
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "All Tools" },
]

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://toolhub.vercel.app/" },
    { "@type": "ListItem", position: 2, name: "All Tools" },
  ],
}

export default function AllToolsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-gradient-to-b from-blue-50 to-white pb-8 pt-24 dark:from-zinc-950 dark:to-zinc-900">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              All Tools
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Browse our complete collection of {tools.length} free online tools
            </p>
          </div>
        </Container>
      </section>
      <ToolSearch />
    </>
  )
}
