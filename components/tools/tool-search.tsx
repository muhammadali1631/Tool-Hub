"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ToolCard } from "@/components/tools/tool-card"
import Container from "@/components/layout/container"
import { tools, searchTools } from "@/data/tools"
import { categories } from "@/data/categories"
import { motion } from "framer-motion"

export function ToolSearch() {
  const [query, setQuery] = useState("")

  const filteredTools = useMemo(() => {
    if (query.trim().length === 0) return null
    const matches = searchTools(query)
    return matches.length > 0 ? matches : []
  }, [query])

  const filteredCategorySlugs = useMemo(() => {
    if (!filteredTools || filteredTools.length === 0) return null
    return new Set(filteredTools.map((t) => t.category.slug))
  }, [filteredTools])

  const noResults = filteredTools !== null && filteredTools.length === 0

  return (
    <>
      <div className="relative mx-auto mt-8 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="h-12 pl-12 text-base"
        />
      </div>

      <section className="py-16">
        <Container>
          {noResults && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-zinc-500 dark:text-zinc-400"
            >
              No tools found for &ldquo;{query}&rdquo;
            </motion.p>
          )}
          {!filteredTools && categories.map((category) => {
            const categoryTools = tools.filter((t) => t.category.slug === category.slug)
            if (categoryTools.length === 0) return null
            return (
              <div key={category.id} className="mb-16 last:mb-0">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {category.name}
                  </h2>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                    {categoryTools.length} tools available
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryTools.map((tool, i) => (
                    <ToolCard key={tool.id} tool={tool} index={i} />
                  ))}
                </div>
              </div>
            )
          })}
          {filteredCategorySlugs && [...filteredCategorySlugs].map((slug) => {
            const category = categories.find((c) => c.slug === slug)!
            const categoryTools = filteredTools!.filter((t) => t.category.slug === slug)
            return (
              <div key={category.id} className="mb-16 last:mb-0">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {category.name}
                  </h2>
                  <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                    {categoryTools.length} tools found
                  </p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryTools.map((tool, i) => (
                    <ToolCard key={tool.id} tool={tool} index={i} />
                  ))}
                </div>
              </div>
            )
          })}
        </Container>
      </section>
    </>
  )
}
