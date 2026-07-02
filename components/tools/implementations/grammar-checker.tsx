"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2, AlertTriangle, XCircle } from "lucide-react"

interface GrammarIssue {
  type: "spelling" | "grammar" | "punctuation" | "passive"
  text: string
  suggestion: string
  index: number
}

function checkGrammar(text: string): GrammarIssue[] {
  const issues: GrammarIssue[] = []
  const words = text.split(/\s+/)
  const commonTypos: Record<string, string> = {
    teh: "the",
    recieve: "receive",
    beleive: "believe",
    seperate: "separate",
    definately: "definitely",
    occured: "occurred",
    ocurred: "occurred",
    milenium: "millennium",
    pharaoh: "pharaoh",
    "alot": "a lot",
    cant: "can't",
    dont: "don't",
    wont: "won't",
    didnt: "didn't",
    doesnt: "doesn't",
    its: "it's",
    youre: "you're",
    theyre: "they're",
    theres: "there's",
    wasnt: "wasn't",
    wouldnt: "wouldn't",
    couldnt: "couldn't",
    shouldnt: "shouldn't",
    hadnt: "hadn't",
    hasnt: "hasn't",
    havnt: "haven't",
    isnt: "isn't",
  }

  words.forEach((w, i) => {
    const clean = w.replace(/[^a-zA-Z]/g, "").toLowerCase()
    if (commonTypos[clean]) {
      issues.push({
        type: "spelling",
        text: w,
        suggestion: commonTypos[clean],
        index: i,
      })
    }
  })

  const passiveRegex = /\b(am|is|are|was|were|be|been|being)\s+\w+ed\b/gi
  let match
  while ((match = passiveRegex.exec(text)) !== null) {
    issues.push({
      type: "passive",
      text: match[0],
      suggestion: "Consider using active voice",
      index: match.index,
    })
  }

  if (text.length > 0 && !/[.!?]$/.test(text.trim())) {
    issues.push({
      type: "punctuation",
      text: "...",
      suggestion: "Consider adding ending punctuation",
      index: text.length - 1,
    })
  }

  return issues
}

export default function GrammarChecker() {
  const [text, setText] = useState("")
  const [issues, setIssues] = useState<GrammarIssue[] | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = () => {
    if (!text.trim()) return
    setLoading(true)
    setTimeout(() => {
      setIssues(checkGrammar(text))
      setLoading(false)
    }, 800)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to check for grammar and spelling issues..."
            className="h-40 w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-y"
          />
          <Button onClick={handleCheck} disabled={loading || !text.trim()}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle className="size-4" />}
            {loading ? "Checking..." : "Check Grammar"}
          </Button>
          {issues && (
            <div className="space-y-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4">
              {issues.length === 0 ? (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="size-5" />
                  <span className="text-sm font-medium">No issues found! Your text looks great.</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="size-5" />
                    <span className="text-sm font-medium">
                      Found {issues.length} potential issue{issues.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {issues.map((issue, i) => (
                      <div key={i} className="flex items-start gap-2 rounded bg-white dark:bg-zinc-800 p-3 text-sm">
                        <XCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                        <div>
                          <span className="font-mono text-zinc-800 dark:text-zinc-200 line-through">{issue.text}</span>
                          <span className="mx-2 text-zinc-400">&rarr;</span>
                          <span className="font-medium text-green-600 dark:text-green-400">{issue.suggestion}</span>
                          <span className="ml-2 rounded bg-zinc-100 dark:bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-500">
                            {issue.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
