import type { Metadata } from "next"
import Container from "@/components/layout/container"
import { Breadcrumb } from "@/components/tools/breadcrumb"
import JsonLd from "@/components/seo/json-ld"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service - ToolHub",
  description: "ToolHub Terms of Service. Understand the terms and conditions for using our free online tools.",
  alternates: { canonical: "https://toolhub.vercel.app/terms" },
  openGraph: {
    title: "Terms of Service - ToolHub",
    description: "Terms and conditions for using ToolHub.",
    url: "https://toolhub.vercel.app/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - ToolHub",
    description: "Terms and conditions for using ToolHub.",
  },
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Terms of Service" },
]

export default function TermsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://toolhub.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Terms of Service" },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-gradient-to-b from-blue-50 to-white pb-12 pt-24 dark:from-zinc-950 dark:to-zinc-900">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <div className="mx-auto mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Terms of Service
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Last updated: January 1, 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Acceptance of Terms</h2>
            <p className="mt-4">
              By accessing and using ToolHub, you agree to these Terms of Service. If you do not 
              agree, please do not use our website or tools.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Use of Tools</h2>
            <p className="mt-4">
              All tools on ToolHub are provided free of charge for personal and commercial use. 
              You may use any tool without registration or payment. You agree not to misuse 
              our tools or use them for any unlawful purpose.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">No Warranty</h2>
            <p className="mt-4">
              Our tools are provided &quot;as is&quot; without any warranty, express or implied. While 
              we strive for accuracy, we do not guarantee that tool outputs are error-free or 
              suitable for your specific purpose.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Limitation of Liability</h2>
            <p className="mt-4">
              ToolHub shall not be liable for any damages arising from the use or inability 
              to use our tools. This includes direct, indirect, incidental, or consequential damages.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Intellectual Property</h2>
            <p className="mt-4">
              The ToolHub name, logo, and website design are our intellectual property. The 
              tools themselves are provided for use, not for reproduction or redistribution.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Changes to Terms</h2>
            <p className="mt-4">
              We reserve the right to modify these terms at any time. Changes will be posted 
              on this page with an updated revision date.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Contact</h2>
            <p className="mt-4">
              For questions about these terms, contact us at{" "}
              <Link className="text-blue-600 underline" href={'/contact'}>Contact</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
