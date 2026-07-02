"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CopyButton } from "@/components/tools/copy-button"

export default function DaysCalculator() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [includeEnd, setIncludeEnd] = useState(true)
  const [excludeWeekends, setExcludeWeekends] = useState(false)

  const result = useMemo(() => {
    if (!startDate || !endDate) return null
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return null

    let totalDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    if (includeEnd) totalDays += 1

    let weekdays = 0
    const current = new Date(start)
    const endInc = new Date(end)
    if (includeEnd) endInc.setDate(endInc.getDate() + 1)

    while (current < endInc) {
      const day = current.getDay()
      if (day !== 0 && day !== 6) weekdays++
      current.setDate(current.getDate() + 1)
    }

    const weeks = Math.floor(totalDays / 7)
    const remainingDays = totalDays % 7
    const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44))
    const years = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25))

    const weekdaysText = excludeWeekends ? weekdays : totalDays

    return {
      totalDays,
      weeks,
      remainingDays,
      months,
      years,
      weekdays,
      weekdaysText,
      weeksText: `${weeks} week${weeks !== 1 ? "s" : ""}${remainingDays > 0 ? `, ${remainingDays} day${remainingDays !== 1 ? "s" : ""}` : ""}`,
    }
  }, [startDate, endDate, includeEnd, excludeWeekends])

  const summaryText = result
    ? `From ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}: ${result.totalDays} days${excludeWeekends ? ` (${result.weekdays} weekdays)` : ""}`
    : ""

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <input
                type="checkbox"
                checked={includeEnd}
                onChange={() => setIncludeEnd(!includeEnd)}
                className="rounded border-zinc-300 dark:border-zinc-600"
              />
              Include end date
            </label>
            <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <input
                type="checkbox"
                checked={excludeWeekends}
                onChange={() => setExcludeWeekends(!excludeWeekends)}
                className="rounded border-zinc-300 dark:border-zinc-600"
              />
              Exclude weekends (business days)
            </label>
          </div>
          {result && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Duration</span>
                {summaryText && <CopyButton text={summaryText} label="Copy" />}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatBox label="Days" value={result.weekdaysText} />
                <StatBox label="Weeks" value={result.weeksText} />
                <StatBox label="Months (approx)" value={result.months} />
                <StatBox label="Years (approx)" value={result.years} />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatBox
                  label={excludeWeekends ? "Business Days" : "Total Days"}
                  value={result.weekdaysText}
                />
              </div>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-3 text-xs text-blue-700 dark:text-blue-300">
                {new Date(startDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                <span className="mx-2">&rarr;</span>
                {new Date(endDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-3 text-center">
      <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{value}</div>
      <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{label}</div>
    </div>
  )
}
