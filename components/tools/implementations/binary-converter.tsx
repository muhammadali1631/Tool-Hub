"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/tools/copy-button"

const bases = [
  { value: 2, label: "Binary (Base 2)", prefix: "0b" },
  { value: 8, label: "Octal (Base 8)", prefix: "0o" },
  { value: 10, label: "Decimal (Base 10)", prefix: "" },
  { value: 16, label: "Hexadecimal (Base 16)", prefix: "0x" },
] as const

function parseNumber(value: string, base: number): number {
  const cleaned = value.replace(/^[0oOxXbB]+/, "").replace(/[^a-fA-F0-9]/g, "")
  if (!cleaned) return NaN
  return parseInt(cleaned, base)
}

function formatNumber(num: number, base: number): string {
  if (isNaN(num)) return ""
  switch (base) {
    case 2: return num.toString(2)
    case 8: return num.toString(8)
    case 10: return num.toString(10)
    case 16: return num.toString(16).toUpperCase()
    default: return ""
  }
}

export default function BinaryConverter() {
  const [inputBase, setInputBase] = useState(10)
  const [inputValue, setInputValue] = useState("42")

  const decimal = useMemo(() => {
    if (!inputValue) return NaN
    return parseNumber(inputValue, inputBase)
  }, [inputValue, inputBase])

  const results = useMemo(() => {
    return bases.map((b) => ({
      ...b,
      value: formatNumber(decimal, b.value),
    }))
  }, [decimal])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Input Base
              </label>
              <select
                value={inputBase}
                onChange={(e) => setInputBase(parseInt(e.target.value))}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {bases.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Enter Number
              </label>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter number"
              />
            </div>
          </div>
          {!isNaN(decimal) && (
            <div className="space-y-2">
              {results.map((r) => (
                <div
                  key={r.value}
                  className="flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-3"
                >
                  <span className="w-40 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {r.label}
                  </span>
                  <span className="flex-1 font-mono text-sm text-zinc-900 dark:text-zinc-50">
                    {r.prefix}{r.value}
                  </span>
                  {r.value && <CopyButton text={`${r.prefix}${r.value}`} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
