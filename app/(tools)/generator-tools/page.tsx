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
    question: "What generator tools are available?",
    answer:
      "We offer a QR code generator, password generator, random number generator, username generator, and fake name & address generator for testing.",
  },
  {
    question: "Are the generator tools free to use?",
    answer:
      "Yes, all generator tools are completely free with unlimited usage. No hidden charges or premium tiers.",
  },
  {
    question: "Are generated passwords and data secure?",
    answer:
      "Yes. All generation happens locally in your browser using cryptographically secure random values. Nothing is stored or transmitted.",
  },
  {
    question: "Do I need an account to use these tools?",
    answer:
      "No account or registration is required. You can start generating instantly without any sign-up.",
  },
  {
    question: "Can I use these tools on mobile?",
    answer:
      "Yes, all generator tools are fully responsive and work seamlessly on smartphones, tablets, and desktops.",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const category = categories.find((c) => c.slug === "generator-tools")
  if (!category) return {}
  return {
    title: `${category.name} - Free Online Generators & Creators`,
    description: category.description,
    alternates: { canonical: "https://toolhub1.vercel.app/generator-tools" },
    openGraph: {
      title: `${category.name} - Free Online Generators & Creators`,
      description: category.description,
      url: "https://toolhub1.vercel.app/generator-tools",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} - Free Online Generators & Creators`,
      description: category.description,
    },
  }
}

export default async function GeneratorToolsPage() {
  const category = categories.find((c) => c.slug === "generator-tools")!
  const categoryTools = getToolsByCategory("generator-tools")

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
      <section className="bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-zinc-900 pb-8 pt-12">
        <Container>
          <Breadcrumb items={[{ label: category.name }]} />
          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
              {category.description}
            </p>
            <p className="mt-2 text-sm font-medium text-amber-600 dark:text-amber-400">
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
