"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { searchTools } from "@/data/tools"
import ThemeToggle from "./theme-toggle"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "All Tools" },
  { href: "/text-tools", label: "Text Tools" },
  { href: "/converter-tools", label: "Converter Tools" },
  { href: "/generator-tools", label: "Generator Tools" },
  { href: "/calculator-tools", label: "Calculator Tools" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") { setShowResults(false); setSearchOpen(false) }
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const searchResults = searchQuery.trim().length > 0 ? searchTools(searchQuery).slice(0, 8) : []

  const closeMenus = () => {
    setMobileMenuOpen(false)
    setSearchOpen(false)
    setSearchQuery("")
    setShowResults(false)
  }

  const handleNavSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.trim().length > 0 && searchTools(value).length > 0) {
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-gray-200/50 bg-white/80 shadow-sm backdrop-blur-lg dark:border-gray-800/50 dark:bg-gray-950/80"
            : "border-transparent bg-white/50 backdrop-blur-lg dark:bg-gray-950/50"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-50"
          >
            ToolHub
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center md:flex" ref={searchRef}>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 240, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={handleNavSearchChange}
                      onFocus={() => { if (searchResults.length > 0) setShowResults(true) }}
                      placeholder="Search tools..."
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm outline-none placeholder:text-gray-400 focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:placeholder:text-gray-500 dark:focus:border-gray-500"
                    />
                    {showResults && searchResults.length > 0 && (
                      <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
                        {searchResults.map((tool) => (
                          <Link
                            key={tool.id}
                            href={`/tools/${tool.slug}`}
                            onClick={closeMenus}
                            className="flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/50"
                          >
                            <Search className="size-3.5 shrink-0 text-gray-400" />
                            <span className="text-gray-900 dark:text-gray-50">{tool.name}</span>
                            <span className="ml-auto text-xs text-gray-500">{tool.category.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => { setSearchOpen((prev) => !prev); if (!searchOpen) { setSearchQuery(""); setShowResults(false) } }}
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  "text-gray-600 hover:bg-gray-100",
                  "dark:text-gray-400 dark:hover:bg-gray-800"
                )}
                aria-label="Toggle search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={cn(
                "rounded-lg p-2 transition-colors md:hidden",
                "text-gray-600 hover:bg-gray-100",
                "dark:text-gray-400 dark:hover:bg-gray-800"
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "overflow-hidden border-b backdrop-blur-lg",
              "border-gray-200/50 bg-white/95 dark:border-gray-800/50 dark:bg-gray-950/95"
            )}
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              <div className="relative mb-3 md:hidden">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleNavSearchChange}
                  onFocus={() => { if (searchResults.length > 0) setShowResults(true) }}
                  placeholder="Search tools..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:placeholder:text-gray-500 dark:focus:border-gray-500"
                />
                {showResults && searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
                    {searchResults.map((tool) => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        onClick={closeMenus}
                        className="flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/50"
                      >
                        <Search className="size-3.5 shrink-0 text-gray-400" />
                        <span className="text-gray-900 dark:text-gray-50">{tool.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
