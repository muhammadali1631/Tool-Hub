import type { Metadata } from "next"
import Container from "@/components/layout/container"
import { Breadcrumb } from "@/components/tools/breadcrumb"
import JsonLd from "@/components/seo/json-ld"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy - ToolHub",
  description: "ToolHub Privacy Policy. Learn how we protect your privacy and handle your data when you use our free online tools.",
  alternates: { canonical: "https://toolhub.vercel.app/privacy" },
  openGraph: {
    title: "Privacy Policy - ToolHub",
    description: "Learn how ToolHub protects your privacy.",
    url: "https://toolhub.vercel.app/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - ToolHub",
    description: "Learn how ToolHub protects your privacy.",
  },
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Privacy Policy" },
]

export default function PrivacyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://toolhub.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy" },
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
              Privacy Policy
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Last updated: January 1, 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="prose prose-zinc mx-auto max-w-3xl dark:prose-invert">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Introduction</h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              ToolHub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information 
              when you visit our website and use our tools.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Information We Collect
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              <strong>We do not collect any personal information.</strong> All tools on ToolHub 
              process data entirely in your browser. Your text, files, and content never leave 
              your device.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Analytics
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              We may use basic analytics to understand how our website is used (page views, 
              time on site, etc.). This data is anonymized and cannot be used to identify you 
              personally. You can opt out of analytics tracking in your browser settings.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Cookies
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              We use minimal cookies necessary for the basic functioning of the website, 
              such as remembering your theme preference (light/dark mode). We do not use 
              tracking cookies or third-party advertising cookies.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Third-Party Services
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Our currency converter tool fetches live exchange rates from a third-party API 
              (Frankfurter API). No personal data is sent in these requests. We do not share 
              any user data with third parties.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Data Security
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Since all tool processing happens locally in your browser, there is no data 
              transmission or storage on our servers. This design inherently protects your 
              privacy and security.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Children&apos;s Privacy
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Our services are safe for all ages. We do not knowingly collect any personal 
              information from children or anyone else.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Changes to This Policy
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              We may update this Privacy Policy from time to time. Changes will be posted 
              on this page with an updated revision date.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Contact
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <Link className="text-blue-600 underline" href={'/contact'}>Contact</Link>.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
