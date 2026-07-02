"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/tools/copy-button"
import { Shuffle } from "lucide-react"

export default function RandomNumberGenerator() {
  const [min, setMin] = useState("1")
  const [max, setMax] = useState("100")
  const [count, setCount] = useState("5")
  const [decimal, setDecimal] = useState(false)
  const [unique, setUnique] = useState(false)
  const [numbers, setNumbers] = useState<number[]>([])

  const generate = () => {
    const mn = parseFloat(min)
    const mx = parseFloat(max)
    const cnt = Math.min(Math.max(1, parseInt(count) || 1), 1000)

    if (isNaN(mn) || isNaN(mx) || mn >= mx) return

    const result: number[] = []
    const used = new Set<string>()

    while (result.length < cnt) {
      let n: number
      if (decimal) {
        n = mn + Math.random() * (mx - mn)
        n = parseFloat(n.toFixed(4))
      } else {
        n = Math.floor(Math.random() * (mx - mn + 1)) + mn
      }

      if (unique) {
        const key = n.toString()
        if (used.has(key)) continue
        used.add(key)
      }
      result.push(n)
    }

    setNumbers(result)
  }

  const totalPossible = useMemo(() => {
    if (unique && !decimal) {
      return Math.max(0, parseInt(max) - parseInt(min) + 1)
    }
    return Infinity
  }, [unique, decimal, min, max])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Minimum</label>
              <Input type="number" value={min} onChange={(e) => setMin(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Maximum</label>
              <Input type="number" value={max} onChange={(e) => setMax(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Count</label>
              <Input type="number" value={count} onChange={(e) => setCount(e.target.value)} min={1} max={1000} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <input type="checkbox" checked={decimal} onChange={() => setDecimal(!decimal)} className="rounded border-zinc-300 dark:border-zinc-600" />
              Decimals
            </label>
            <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <input
                type="checkbox"
                checked={unique}
                onChange={() => setUnique(!unique)}
                disabled={!unique && decimal}
                className="rounded border-zinc-300 dark:border-zinc-600"
              />
              Unique numbers
            </label>
            {unique && !decimal && (
              <span className="text-xs text-amber-500">Available: {totalPossible} numbers</span>
            )}
          </div>
          <Button onClick={generate} className="w-full sm:w-auto">
            <Shuffle className="size-4" />
            Generate
          </Button>
          {numbers.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Generated Numbers ({numbers.length})
                </span>
                <CopyButton text={numbers.join(", ")} label="Copy All" />
              </div>
              <div className="flex flex-wrap gap-2">
                {numbers.map((n, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-3 py-1.5 text-sm font-mono text-zinc-900 dark:text-zinc-50"
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
