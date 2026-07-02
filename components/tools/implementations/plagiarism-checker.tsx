"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, AlertTriangle, Loader2 } from "lucide-react"

function simulateCheck(text: string) {
  const sentences = text.match(/[^.!?\n]+[.!?\n]*/g) || []
  const commonPhrases = [
    "the", "and", "that", "have", "with", "this", "from", "they", "been", "well",
    "according to", "research shows", "studies have shown", "it is important to",
    "in order to", "due to the fact", "at the end of the day", "all things considered",
  ]
  const matches = sentences.filter((s) =>
    commonPhrases.some((p) => s.toLowerCase().includes(p))
  )
  const score = sentences.length > 0
    ? Math.min(100, Math.round((matches.length / sentences.length) * 100))
    : 0
  return { score, matches, total: sentences.length }
}

export default function PlagiarismChecker() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<ReturnType<typeof simulateCheck> | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = () => {
    if (!text.trim()) return
    setLoading(true)
    setTimeout(() => {
      setResult(simulateCheck(text))
      setLoading(false)
    }, 1000)
  }

  const scoreColor =
    result && result.score > 50
      ? "text-red-600 dark:text-red-400"
      : result && result.score > 20
        ? "text-amber-600 dark:text-amber-400"
        : "text-green-600 dark:text-green-400"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here to check for potential plagiarism..."
            className="h-40 w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
          />
          <Button onClick={handleCheck} disabled={loading || !text.trim()}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
            {loading ? "Checking..." : "Check Plagiarism"}
          </Button>
          {result && (
            <div className="space-y-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="size-5 text-amber-500" />
                <div>
                  <span className={`text-2xl font-bold ${scoreColor}`}>{result.score}%</span>
                  <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-400">Similarity Score</span>
                </div>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Found {result.matches.length} of {result.total} sentences matching common patterns.
              </p>
              {result.matches.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">Matched sentences:</p>
                  <ul className="space-y-1">
                    {result.matches.slice(0, 5).map((s, i) => (
                      <li key={i} className="rounded bg-red-50 dark:bg-red-950/30 px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                        {s.trim()}
                      </li>
                    ))}
                    {result.matches.length > 5 && (
                      <li className="text-xs text-zinc-400">...and {result.matches.length - 5} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
