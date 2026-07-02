"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/tools/copy-button"

const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

function convertHundreds(n: number): string {
  const parts: string[] = []
  const h = Math.floor(n / 100)
  if (h > 0) {
    parts.push(`${ones[h]} hundred`)
  }
  const remainder = n % 100
  if (remainder > 0) {
    if (remainder < 20) {
      parts.push(ones[remainder])
    } else {
      const t = Math.floor(remainder / 10)
      const o = remainder % 10
      parts.push(`${tens[t]}${o > 0 ? `-${ones[o]}` : ""}`)
    }
  }
  return parts.join(" ")
}

function numberToWords(num: number): string {
  if (num === 0) return "zero"
  if (num < 0) return `negative ${numberToWords(Math.abs(num))}`

  const scales = ["", "thousand", "million", "billion", "trillion"]
  const parts: string[] = []

  let remaining = Math.floor(num)
  let scaleIndex = 0

  while (remaining > 0 && scaleIndex < scales.length) {
    const chunk = remaining % 1000
    if (chunk > 0) {
      const chunkWords = convertHundreds(chunk)
      parts.unshift(`${chunkWords}${scaleIndex > 0 ? ` ${scales[scaleIndex]}` : ""}`)
    }
    remaining = Math.floor(remaining / 1000)
    scaleIndex++
  }

  return parts.join(" ").trim()
}

export default function NumberToWords() {
  const [number, setNumber] = useState("")
  const [currencyMode, setCurrencyMode] = useState(false)

  const result = useMemo(() => {
    const num = parseFloat(number)
    if (isNaN(num) || number === "") return ""

    if (!currencyMode) {
      const [intPart] = number.split(".")
      const whole = parseInt(intPart || "0")
      return numberToWords(whole)
    }

    const parts = number.split(".")
    const dollars = parseInt(parts[0] || "0")
    const cents = parts[1] ? parseInt(parts[1].padEnd(2, "0").slice(0, 2)) : 0

    let words = numberToWords(dollars)
    words += dollars === 1 ? " dollar" : " dollars"
    if (cents > 0) {
      words += ` and ${numberToWords(cents)}`
      words += cents === 1 ? " cent" : " cents"
    }
    return words
  }, [number, currencyMode])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Enter a number
            </label>
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="e.g. 1234"
              step="any"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={currencyMode}
              onChange={(e) => setCurrencyMode(e.target.checked)}
              className="rounded border-zinc-300 dark:border-zinc-600"
            />
            Currency format (dollars and cents)
          </label>
          {result && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                In Words
              </label>
              <div className="flex items-start gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4">
                <p className="flex-1 text-base font-medium text-zinc-900 dark:text-zinc-50 capitalize">
                  {result}
                </p>
                <CopyButton text={result} />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
