import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getToolBySlug, getRelatedTools } from "@/data/tools"
import Container from "@/components/layout/container"
import { Breadcrumb } from "@/components/tools/breadcrumb"
import { HowToUse } from "@/components/tools/how-to-use"
import { FeaturesBenefits } from "@/components/tools/features-benefits"
import { FAQ } from "@/components/tools/faq"
import { CTASection } from "@/components/tools/cta-section"
import { RelatedTools } from "@/components/tools/related-tools"
import JsonLd from "@/components/seo/json-ld"
import { Badge } from "@/components/ui/badge"
import ToolRenderer from "@/components/tools/tool-renderer"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return {}
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: tool.keywords,
    openGraph: { title: tool.seoTitle, description: tool.seoDescription, type: "website" },
    twitter: { card: "summary_large_image", title: tool.seoTitle, description: tool.seoDescription },
    alternates: { canonical: `https://toolhub1.vercel.app/tools/${tool.slug}` },
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  const relatedTools = getRelatedTools(tool)

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "Utilities",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0" },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://toolhub1.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://toolhub1.vercel.app/tools" },
      { "@type": "ListItem", position: 3, name: tool.name },
    ],
  }

  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-zinc-900 pb-8 pt-12">
        <Container>
          <Breadcrumb
            items={[
              { label: "Tools", href: "/tools" },
              { label: tool.category.name, href: `/tools?category=${tool.category.slug}` },
              { label: tool.name },
            ]}
          />
          <div className="flex flex-col items-start gap-4">
            <Badge variant="secondary" className="text-xs">
              {tool.category.name}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {tool.name}
            </h1>
            <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
              {tool.description}
            </p>
          </div>
        </Container>
      </section>
      <section className="py-8">
        <Container>
          <ToolRenderer slug={slug} />
        </Container>
      </section>
      <section className="pb-12">
        <Container>
          <HowToUse steps={tool.howToUse} />
          <FeaturesBenefits features={tool.features} benefits={tool.benefits} />
          <FAQ items={tool.faq} />
          {relatedTools.length > 0 && <RelatedTools tools={relatedTools} />}
          <CTASection />
        </Container>
      </section>
    </>
  )
}
