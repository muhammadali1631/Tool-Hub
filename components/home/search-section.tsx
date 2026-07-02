"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { searchTools } from "@/data/tools"

interface SearchSectionProps {
  placeholder?: string
  className?: string
}

export function SearchSection({ placeholder = "Search tools...", className }: SearchSectionProps) {
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

  function handleSelect() {
    setIsOpen(false)
    setQuery("")
  }

  return (
    <div ref={searchRef} className={className}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
          placeholder={placeholder}
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
              onClick={handleSelect}
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
    </div>
  )
}
