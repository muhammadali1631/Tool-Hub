"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface BMICategory {
  range: [number, number]
  label: string
  color: string
  bgColor: string
}

const categories: BMICategory[] = [
  { range: [0, 16], label: "Severe Thinness", color: "text-blue-600 dark:text-blue-400", bgColor: "bg-blue-500" },
  { range: [16, 17], label: "Moderate Thinness", color: "text-cyan-600 dark:text-cyan-400", bgColor: "bg-cyan-500" },
  { range: [17, 18.5], label: "Mild Thinness", color: "text-teal-600 dark:text-teal-400", bgColor: "bg-teal-500" },
  { range: [18.5, 25], label: "Normal", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-500" },
  { range: [25, 30], label: "Overweight", color: "text-amber-600 dark:text-amber-400", bgColor: "bg-amber-500" },
  { range: [30, 35], label: "Obese Class I", color: "text-orange-600 dark:text-orange-400", bgColor: "bg-orange-500" },
  { range: [35, 40], label: "Obese Class II", color: "text-red-600 dark:text-red-400", bgColor: "bg-red-500" },
  { range: [40, Infinity], label: "Obese Class III", color: "text-rose-600 dark:text-rose-400", bgColor: "bg-rose-500" },
]

export default function BMICalculator() {
  const [unit, setUnit] = useState("metric")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")

  const result = useMemo(() => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) return null

    let bmi: number
    if (unit === "metric") {
      bmi = w / ((h / 100) * (h / 100))
    } else {
      bmi = (w / (h * h)) * 703
    }

    const category = categories.find((c) => bmi >= c.range[0] && bmi < c.range[1])
    return { bmi, category }
  }, [unit, height, weight])

  const bmiPercent = result ? Math.min((result.bmi / 40) * 100, 100) : 0

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Unit System
            </label>
            <div className="flex gap-2">
              {[
                { value: "metric", label: "Metric (kg / cm)" },
                { value: "imperial", label: "Imperial (lbs / in)" },
              ].map((u) => (
                <button
                  key={u.value}
                  onClick={() => { setUnit(u.value); setHeight(""); setWeight("") }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    unit === u.value
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {u.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Height ({unit === "metric" ? "cm" : "inches"})
              </label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === "metric" ? "e.g. 175" : "e.g. 69"}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
              />
            </div>
          </div>
          {result && (
            <div className="space-y-4">
              <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-6 text-center">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Your BMI</div>
                <div className={`text-4xl font-bold ${result.category?.color}`}>
                  {result.bmi.toFixed(1)}
                </div>
                <div className={`mt-2 text-sm font-medium ${result.category?.color}`}>
                  {result.category?.label}
                </div>
              </div>
              <div className="relative h-4 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                {categories.map((cat, i) => {
                  const start = Math.min((Math.max(cat.range[0], 0) / 40) * 100, 100)
                  const end = Math.min((Math.min(cat.range[1], 40) / 40) * 100, 100)
                  const width = end - start
                  return (
                    <div
                      key={i}
                      className={`absolute top-0 h-full ${cat.bgColor} opacity-30`}
                      style={{ left: `${start}%`, width: `${width}%` }}
                    />
                  )
                })}
                <div
                  className="absolute top-0 h-full w-1 bg-zinc-900 dark:bg-white transition-all"
                  style={{ left: `${bmiPercent}%` }}
                />
              </div>
              <div className="flex flex-wrap justify-between text-xs text-zinc-400">
                <span>0</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-3 text-xs text-blue-700 dark:text-blue-300">
                A BMI between <strong>18.5 and 24.9</strong> is considered healthy for most adults. Consult a healthcare provider for a complete assessment.
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
