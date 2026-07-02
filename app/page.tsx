"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Zap, DollarSign, Shield, UserX, Smartphone, ArrowRight, ChevronRight } from "lucide-react"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Container from "@/components/layout/container"
import { ToolCard } from "@/components/tools/tool-card"
import { FAQ } from "@/components/tools/faq"
import { CTASection } from "@/components/tools/cta-section"
import { tools, popularTools, searchTools } from "@/data/tools"
import { categories } from "@/data/categories"

const faqItems = [
  { question: "Are all tools really free?", answer: "Yes, every tool on our platform is completely free to use forever. There are no hidden charges, premium tiers, or usage limits." },
  { question: "Do I need to create an account?", answer: "No, you don't need to register or create an account. All tools are accessible immediately without any sign-up process." },
  { question: "Is my data secure?", answer: "Absolutely. All tool processing happens locally in your browser. Your data is never uploaded to our servers or stored anywhere." },
  { question: "Can I use these tools on mobile?", answer: "Yes, all our tools are fully responsive and work seamlessly on smartphones, tablets, and desktop devices." },
  { question: "Are new tools added regularly?", answer: "Yes, we constantly develop and add new tools to our collection. Check back regularly for new additions." },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ToolsByCategorySection />
      <PopularToolsSection />
      <WhyChooseUsSection />
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FAQ items={faqItems} />
          </div>
        </Container>
      </section>
      <section className="pb-16">
        <Container>
          <CTASection
            title="Ready to Get Started?"
            description="Explore our collection of free online tools to simplify your workflow."
          />
        </Container>
      </section>
    </>
  )
}

function HeroSection() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    if (query.trim().length > 0) {
      return searchTools(query).slice(0, 8)
    }
    return []
  }, [query])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (value.trim().length > 0) {
      const matches = searchTools(value)
      if (matches.length > 0) setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white pb-20 pt-24 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900 sm:pt-32">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[30rem] rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[25rem] rounded-full bg-purple-400/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 size-[20rem] rounded-full bg-pink-400/10 blur-3xl" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              {tools.length} Free Online Tools Available
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
              20 Free Online Tools
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
              Fast, Secure, and Completely Free
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-500 dark:text-zinc-500">
              Access our comprehensive collection of free online tools for text processing, unit conversion,
              code generation, calculations, and more. No registration required, all tools work directly in
              your browser.
            </p>
          </motion.div>

          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mx-auto mt-10 max-w-xl"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                onFocus={() => { if (results.length > 0) setIsOpen(true) }}
                placeholder="Search tools..."
                className="w-full rounded-xl border border-zinc-200 bg-white/80 py-4 pl-12 pr-4 text-base shadow-lg backdrop-blur-sm placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-blue-400"
              />
            </div>

            {isOpen && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
              >
                {results.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    onClick={() => { setIsOpen(false); setQuery("") }}
                    className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/50"
                  >
                    <Search className="size-4 shrink-0 text-zinc-400" />
                    <div className="text-left">
                      <span className="text-zinc-900 dark:text-zinc-50">{tool.name}</span>
                      <span className="ml-2 text-xs text-zinc-500">{tool.category.name}</span>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}

            {isOpen && query.length > 0 && results.length === 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-zinc-200 bg-white p-4 text-center text-sm text-zinc-500 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                No tools found for &ldquo;{query}&rdquo;
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Button asChild size="lg" className="rounded-full px-8 py-6 text-base">
              <Link href="/tools">
                Browse All Tools
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

function CategoriesSection() {
  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    FileText: Icons.FileText,
    Repeat: Icons.Repeat,
    Sparkles: Icons.Sparkles,
    Calculator: Icons.Calculator,
  }

  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-amber-500 to-orange-500",
    "from-emerald-500 to-teal-500",
  ]

  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Browse by Category
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Find the right tool for your needs
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const IconComponent = categoryIcons[category.icon] ?? Icons.Wrench
            const toolCount = tools.filter((t) => t.category.slug === category.slug).length
            return (
              <Link key={category.id} href={`/${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                  <div className="relative">
                    <div className={`inline-flex rounded-xl bg-gradient-to-br ${gradients[index]} p-3 text-white`}>
                      <IconComponent className="size-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {category.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {toolCount} tools
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        View All
                        <ChevronRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

function ToolsByCategorySection() {
  return (
    <section className="bg-zinc-50/50 py-20 dark:bg-zinc-900/50">
      <Container>
        {categories.map((category, ci) => {
          const categoryTools = tools.filter((t) => t.category.slug === category.slug).slice(0, 4)
          if (categoryTools.length === 0) return null
          return (
            <div key={category.id} className={ci > 0 ? "mt-16" : ""}>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {category.name}
                </h2>
                <Link
                  href={`/${category.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View All {category.name}
                  <ChevronRight className="size-4" />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categoryTools.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} index={i} />
                ))}
              </div>
            </div>
          )
        })}
      </Container>
    </section>
  )
}

function PopularToolsSection() {
  const shown = popularTools.slice(0, 6)
  return (
    <section className="py-20">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Popular Tools
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Our most used tools trusted by thousands
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

function WhyChooseUsSection() {
  const items = [
    { icon: Zap, title: "Fast", description: "Tools that work instantly with real-time results, no waiting for server processing." },
    { icon: DollarSign, title: "Free", description: "100% free to use with no hidden charges, premium tiers, or usage limits." },
    { icon: Shield, title: "Secure", description: "All processing happens locally in your browser. Your data never leaves your device." },
    { icon: UserX, title: "No Registration", description: "Start using any tool immediately. No account creation or login required." },
    { icon: Smartphone, title: "Mobile Friendly", description: "Fully responsive design that works seamlessly on phones, tablets, and desktops." },
  ]

  return (
    <section className="bg-zinc-50/50 py-20 dark:bg-zinc-900/50">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Why Choose Us
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Everything you need, nothing you don&apos;t
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item, i) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-zinc-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mx-auto inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                  <IconComponent className="size-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
