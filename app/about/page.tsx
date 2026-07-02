import type { Metadata } from "next"
import Link from "next/link"
import Container from "@/components/layout/container"
import { Breadcrumb } from "@/components/tools/breadcrumb"
import { Button } from "@/components/ui/button"
import JsonLd from "@/components/seo/json-ld"
import { Zap, Globe, Shield, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - ToolHub | Free Online Tools",
  description: "Learn about ToolHub - our mission to provide fast, secure, and completely free online tools for everyone.",
  alternates: { canonical: "https://toolhub.vercel.app/about" },
  openGraph: {
    title: "About ToolHub",
    description: "Our mission to provide fast, secure, and completely free online tools.",
    url: "https://toolhub.vercel.app/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ToolHub",
    description: "Our mission to provide fast, secure, and completely free online tools.",
  },
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "About" },
]

const stats = [
  { label: "Free Tools", value: "20+", icon: Zap },
  { label: "Categories", value: "4", icon: Globe },
  { label: "Secure", value: "100%", icon: Shield },
]

const values = [
  {
    title: "Free for Everyone",
    description: "All our tools are completely free to use with no hidden charges, premium tiers, or usage limits.",
  },
  {
    title: "Privacy First",
    description: "All processing happens locally in your browser. Your data never leaves your device.",
  },
  {
    title: "Built for Speed",
    description: "Lightning-fast tools that work instantly. No waiting for server processing.",
  },
  {
    title: "Constantly Improving",
    description: "We regularly add new tools and improve existing ones based on user feedback.",
  },
]

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://toolhub.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "About" },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <section className="bg-gradient-to-b from-blue-50 to-white pb-12 pt-24 dark:from-zinc-950 dark:to-zinc-900">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <div className="mx-auto mt-8 max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              About ToolHub
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              We believe powerful online tools should be free, fast, and private for everyone.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid  gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-zinc-200 bg-white p-6 text-center dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <Icon className="mx-auto size-8 text-blue-600 dark:text-blue-400" />
                  <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50/50 py-16 dark:bg-zinc-900/50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Our Mission
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              ToolHub was created with a simple mission: provide high-quality, reliable online tools 
              that anyone can use without barriers. We believe that essential tools for text processing, 
              conversion, generation, and calculation should be accessible to everyone, regardless of 
              their budget or technical expertise.
            </p>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Every tool on our platform is designed to work entirely in your browser. This means your 
              data stays private, results are instant, and you can use our tools with confidence.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Our Values
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-16 text-center">
        <Container>
          <h2 className="text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-2 text-white/80">
            Explore our collection of free tools
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full bg-white text-zinc-900 hover:bg-white/90">
            <Link href="/tools">Browse All Tools</Link>
          </Button>
        </Container>
      </section>
    </>
  )
}
