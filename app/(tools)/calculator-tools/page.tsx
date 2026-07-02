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
    question: "What calculator tools are available?",
    answer:
      "We offer a loan and EMI calculator, age calculator, percentage calculator, BMI calculator, and days between dates calculator.",
  },
  {
    question: "Are the calculator tools free to use?",
    answer:
      "Yes, all calculator tools are completely free with unlimited calculations. No hidden charges or usage limits.",
  },
  {
    question: "How accurate are the calculations?",
    answer:
      "All calculations use precise mathematical formulas. Loan calculations follow standard EMI formulas, and date calculations account for leap years and varying month lengths.",
  },
  {
    question: "Do I need an account to use the calculators?",
    answer:
      "No account or registration is required. You can start using any calculator tool immediately.",
  },
  {
    question: "Can I use these calculators on mobile?",
    answer:
      "Yes, all calculator tools are fully responsive and work seamlessly on smartphones, tablets, and desktops.",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const category = categories.find((c) => c.slug === "calculator-tools")
  if (!category) return {}
  return {
    title: `${category.name} - Free Online Calculators`,
    description: category.description,
    alternates: { canonical: "https://toolhub.vercel.app/calculator-tools" },
    openGraph: {
      title: `${category.name} - Free Online Calculators`,
      description: category.description,
      url: "https://toolhub.vercel.app/calculator-tools",
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} - Free Online Calculators`,
      description: category.description,
    },
  }
}

export default async function CalculatorToolsPage() {
  const category = categories.find((c) => c.slug === "calculator-tools")!
  const categoryTools = getToolsByCategory("calculator-tools")

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
      <section className="bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-zinc-900 pb-8 pt-12">
        <Container>
          <Breadcrumb items={[{ label: category.name }]} />
          <div className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
              {category.description}
            </p>
            <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
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
