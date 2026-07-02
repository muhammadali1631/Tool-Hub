"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/tools/copy-button"

const modes = [
  { value: "what-percent", label: "X is what % of Y?" },
  { value: "percent-of", label: "What is X% of Y?" },
  { value: "change", label: "Percentage increase/decrease" },
]

export default function PercentageCalculator() {
  const [mode, setMode] = useState("what-percent")
  const [val1, setVal1] = useState("")
  const [val2, setVal2] = useState("")

  const result = useMemo(() => {
    const a = parseFloat(val1)
    const b = parseFloat(val2)

    switch (mode) {
      case "what-percent": {
        if (isNaN(a) || isNaN(b) || b === 0) return null
        const pct = (a / b) * 100
        return {
          formula: `${a} / ${b} × 100`,
          value: `${pct.toFixed(2)}%`,
          description: `${val1} is ${pct.toFixed(2)}% of ${val2}`,
        }
      }
      case "percent-of": {
        if (isNaN(a) || isNaN(b)) return null
        const val = (a / 100) * b
        return {
          formula: `${a}% × ${b}`,
          value: val.toFixed(4),
          description: `${a}% of ${b} = ${val.toFixed(4)}`,
        }
      }
      case "change": {
        if (isNaN(a) || isNaN(b) || a === 0) return null
        const pct = ((b - a) / a) * 100
        const direction = pct >= 0 ? "increase" : "decrease"
        return {
          formula: `((${b} - ${a}) / ${a}) × 100`,
          value: `${Math.abs(pct).toFixed(2)}%`,
          description: `${direction} of ${Math.abs(pct).toFixed(2)}% from ${val1} to ${val2}`,
        }
      }
      default:
        return null
    }
  }, [mode, val1, val2])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Calculation Type
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              {modes.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {mode === "what-percent" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">X value (part)</label>
                  <Input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} placeholder="e.g. 25" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Y value (total)</label>
                  <Input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} placeholder="e.g. 200" />
                </div>
              </>
            )}
            {mode === "percent-of" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Percentage (%)</label>
                  <Input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} placeholder="e.g. 15" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Of value</label>
                  <Input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} placeholder="e.g. 200" />
                </div>
              </>
            )}
            {mode === "change" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Original value</label>
                  <Input type="number" value={val1} onChange={(e) => setVal1(e.target.value)} placeholder="e.g. 100" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">New value</label>
                  <Input type="number" value={val2} onChange={(e) => setVal2(e.target.value)} placeholder="e.g. 150" />
                </div>
              </>
            )}
          </div>
          {result && (
            <div className="space-y-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Formula: {result.formula}</div>
                  <div className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {result.value}
                  </div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {result.description}
                  </p>
                </div>
                <CopyButton text={result.value} />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
