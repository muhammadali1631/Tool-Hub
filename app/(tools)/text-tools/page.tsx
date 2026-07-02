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
    question: "What text tools are available?",
    answer:
      "We offer a variety of text processing tools including a word counter, case converter, text to slug generator, plagiarism checker, and grammar checker. Each tool is designed to help you work with text more efficiently.",
  },
  {
    question: "Are the text tools free to use?",
    answer:
      "Yes, all text tools are completely free with no usage limits or hidden charges. You can use them as many times as you need.",
  },
  {
    question: "Is my text stored on your servers?",
    answer:
      "No. All text processing happens entirely in your browser. Your data never leaves your device, ensuring complete privacy and security.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account or registration is required. You can start using any text tool immediately without signing up.",
  },
  {
    question: "Can I use these tools on my mobile device?",
    answer:
      "Yes, all our text tools are fully responsive and work seamlessly on smartphones, tablets, and desktop devices.",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const category = categories.find((c) => c.slug === "text-tools")
  if (!category) return {}
  return {
    title: `${category.name} - Free Online Text Processing Tools`,
    description: category.description,
    alternates: { canonical: "https://toolhub.vercel.app/text-tools" },
    openGraph: {
      title: `${category.name} - Free Online Text Processing Tools`,
      description: category.description,
      url: "https://toolhub.vercel.app/text-tools",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} - Free Online Text Processing Tools`,
      description: category.description,
    },
  }
}

export default async function TextToolsPage() {
  const category = categories.find((c) => c.slug === "text-tools")!
  const categoryTools = getToolsByCategory("text-tools")

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://toolhub.vercel.app/" },
      { "@type": "ListItem", position: 2, name: category.name },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-zinc-900 pb-8 pt-12">
        <Container>
          <Breadcrumb items={[{ label: category.name }]} />
          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
              {category.description}
            </p>
            <p className="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
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
