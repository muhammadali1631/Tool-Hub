import type { Metadata } from "next"
import Container from "@/components/layout/container"
import { Breadcrumb } from "@/components/tools/breadcrumb"
import { ToolCard } from "@/components/tools/tool-card"
import { FAQ } from "@/components/tools/faq"
import { CTASection } from "@/components/tools/cta-section"
import { getToolsByCategory } from "@/data/tools"
import { categories } from "@/data/categories"
import JsonLd from "@/components/seo/json-ld"

const faqItems = [
  {
    question: "What converter tools are available?",
    answer:
      "We offer a unit converter, currency converter with live exchange rates, number to words converter, binary/hex/decimal converter, and an image format converter.",
  },
  {
    question: "Are the converter tools free to use?",
    answer:
      "Yes, all converter tools are completely free with unlimited conversions. There are no hidden charges or usage limits.",
  },
  {
    question: "How accurate are the conversions?",
    answer:
      "All conversions use standard international formulas and official exchange rates where applicable. Results are mathematically precise.",
  },
  {
    question: "Is my data stored when I use these tools?",
    answer:
      "No. All conversion processing happens locally in your browser. Your data is never sent to or stored on our servers.",
  },
  {
    question: "Do I need an account to use the converters?",
    answer:
      "No account or registration is required. You can start using any converter tool instantly.",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const category = categories.find((c) => c.slug === "converter-tools")
  if (!category) return {}
  return {
    title: `${category.name} - Free Online Unit & Format Converters`,
    description: category.description,
    alternates: { canonical: "https://toolhub1.vercel.app/converter-tools" },
    openGraph: {
      title: `${category.name} - Free Online Unit & Format Converters`,
      description: category.description,
      url: "https://toolhub1.vercel.app/converter-tools",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} - Free Online Unit & Format Converters`,
      description: category.description,
    },
  }
}

export default async function ConverterToolsPage() {
  const category = categories.find((c) => c.slug === "converter-tools")!
  const categoryTools = getToolsByCategory("converter-tools")

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://toolhub1.vercel.app/" },
      { "@type": "ListItem", position: 2, name: category.name },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-zinc-900 pb-8 pt-12">
        <Container>
          <Breadcrumb items={[{ label: category.name }]} />
          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
              {category.description}
            </p>
            <p className="mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">
              {categoryTools.length} tools available
            </p>
          </div>
        </Container>
      </section>
      <section className="py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
        </Container>
      </section>
      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FAQ items={faqItems} />
          </div>
          <div className="mt-12">
            <CTASection />
          </div>
        </Container>
      </section>
    </>
  )
}
