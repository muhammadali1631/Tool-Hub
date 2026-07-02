"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface UnitCategory {
  name: string
  units: { label: string; value: string; toBase: (v: number) => number; fromBase: (v: number) => number }[]
}

const categories: UnitCategory[] = [
  {
    name: "Length",
    units: [
      { label: "Millimeters", value: "mm", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { label: "Centimeters", value: "cm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { label: "Meters", value: "m", toBase: (v) => v, fromBase: (v) => v },
      { label: "Kilometers", value: "km", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { label: "Inches", value: "in", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { label: "Feet", value: "ft", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { label: "Yards", value: "yd", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { label: "Miles", value: "mi", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    ],
  },
  {
    name: "Weight",
    units: [
      { label: "Milligrams", value: "mg", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
      { label: "Grams", value: "g", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { label: "Kilograms", value: "kg", toBase: (v) => v, fromBase: (v) => v },
      { label: "Metric Tons", value: "t", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { label: "Ounces", value: "oz", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      { label: "Pounds", value: "lb", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    ],
  },
  {
    name: "Temperature",
    units: [
      { label: "Celsius", value: "c", toBase: (v) => v, fromBase: (v) => v },
      { label: "Fahrenheit", value: "f", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      { label: "Kelvin", value: "k", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  {
    name: "Volume",
    units: [
      { label: "Milliliters", value: "ml", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { label: "Liters", value: "l", toBase: (v) => v, fromBase: (v) => v },
      { label: "Cubic Meters", value: "m3", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { label: "Gallons (US)", value: "gal", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { label: "Quarts (US)", value: "qt", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      { label: "Cups", value: "cup", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    ],
  },
  {
    name: "Speed",
    units: [
      { label: "Meters/second", value: "ms", toBase: (v) => v, fromBase: (v) => v },
      { label: "Kilometers/hour", value: "kmh", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { label: "Miles/hour", value: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { label: "Knots", value: "kn", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },
]

export default function UnitConverter() {
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [fromUnit, setFromUnit] = useState("")
  const [toUnit, setToUnit] = useState("")
  const [value, setValue] = useState("1")

  const category = categories[categoryIndex]

  const fromValue = category.units.find((u) => u.value === fromUnit)
  const toValue = category.units.find((u) => u.value === toUnit)

  const result = useMemo(() => {
    if (!fromValue || !toValue || !value) return ""
    const num = parseFloat(value)
    if (isNaN(num)) return ""
    const base = fromValue.toBase(num)
    const converted = toValue.fromBase(base)
    return converted.toLocaleString(undefined, {
      maximumFractionDigits: 10,
      minimumFractionDigits: 0,
    })
  }, [fromValue, toValue, value])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Category
            </label>
            <select
              value={categoryIndex}
              onChange={(e) => {
                const idx = parseInt(e.target.value)
                setCategoryIndex(idx)
                setFromUnit(categories[idx].units[0].value)
                setToUnit(categories[idx].units[1]?.value ?? categories[idx].units[0].value)
              }}
              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((c, i) => (
                <option key={i} value={i}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {category.units.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Value
              </label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {category.units.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
          {result && (
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-4 text-center">
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Result</div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {value} {fromValue?.label} = {result} {toValue?.label}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
