"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/tools/copy-button"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export default function TextToSlug() {
  const [text, setText] = useState("")

  const slug = useMemo(() => slugify(text), [text])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Enter text to convert
            </label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. My Awesome Blog Post Title"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Generated Slug
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2.5 text-sm font-mono text-zinc-900 dark:text-zinc-100">
                {slug || <span className="text-zinc-400 dark:text-zinc-500">slug will appear here</span>}
              </div>
              {slug && <CopyButton text={slug} />}
            </div>
          </div>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-3 text-xs text-blue-700 dark:text-blue-300">
            <strong>Preview:</strong> https://example.com/{slug || "your-slug"}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
