"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function WordCounter() {
  const [text, setText] = useState("")

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, "").length
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(Boolean).length : 0
    const readingTime = Math.max(1, Math.ceil(words / 200))
    const speakingTime = Math.max(1, Math.ceil(words / 150))
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime, speakingTime }
  }, [text])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="h-48 w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <StatBox label="Words" value={stats.words.toLocaleString()} />
            <StatBox label="Characters" value={stats.chars.toLocaleString()} />
            <StatBox label="Characters (no space)" value={stats.charsNoSpace.toLocaleString()} />
            <StatBox label="Sentences" value={stats.sentences.toLocaleString()} />
            <StatBox label="Paragraphs" value={stats.paragraphs.toLocaleString()} />
            <StatBox label="Reading Time" value={`${stats.readingTime} min`} />
            <StatBox label="Speaking Time" value={`${stats.speakingTime} min`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-3 text-center">
      <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{value}</div>
      <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
    </div>
  )
}
