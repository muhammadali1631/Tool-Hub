"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CopyButton } from "@/components/tools/copy-button"

const converters = {
  uppercase: (s: string) => s.toUpperCase(),
  lowercase: (s: string) => s.toLowerCase(),
  "title-case": (s: string) =>
    s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  "sentence-case": (s: string) => {
    return s
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
  },
  "alternating-case": (s: string) =>
    s
      .split("")
      .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
      .join(""),
  "inverse-case": (s: string) =>
    s
      .split("")
      .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
      .join(""),
}

export default function CaseConverter() {
  const [text, setText] = useState("")
  const [activeCase, setActiveCase] = useState<keyof typeof converters>("uppercase")

  const result = useMemo(() => {
    if (!text) return ""
    return converters[activeCase](text)
  }, [text, activeCase])

  const cases = [
    { key: "uppercase", label: "UPPER CASE" },
    { key: "lowercase", label: "lower case" },
    { key: "title-case", label: "Title Case" },
    { key: "sentence-case", label: "Sentence case" },
    { key: "alternating-case", label: "aLtErNaTiNg" },
    { key: "inverse-case", label: "InVeRsE" },
  ] as const

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="h-32 w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
          />
          <div className="flex flex-wrap gap-2">
            {cases.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveCase(c.key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeCase === c.key
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={result}
              placeholder="Converted text will appear here..."
              className="h-32 w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4 text-sm text-zinc-900 dark:text-zinc-100 resize-y"
            />
            {result && (
              <div className="absolute top-2 right-2">
                <CopyButton text={result} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
