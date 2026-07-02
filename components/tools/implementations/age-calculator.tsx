"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"

interface AgeResult {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
  totalDays: number
  totalHours: number
  totalMinutes: number
  totalSeconds: number
  nextBirthday: string
  zodiac: string
  isBirthday: boolean
}

const zodiacSigns = [
  { name: "Capricorn", start: { m: 1, d: 1 }, end: { m: 1, d: 19 } },
  { name: "Aquarius", start: { m: 1, d: 20 }, end: { m: 2, d: 18 } },
  { name: "Pisces", start: { m: 2, d: 19 }, end: { m: 3, d: 20 } },
  { name: "Aries", start: { m: 3, d: 21 }, end: { m: 4, d: 19 } },
  { name: "Taurus", start: { m: 4, d: 20 }, end: { m: 5, d: 20 } },
  { name: "Gemini", start: { m: 5, d: 21 }, end: { m: 6, d: 20 } },
  { name: "Cancer", start: { m: 6, d: 21 }, end: { m: 7, d: 22 } },
  { name: "Leo", start: { m: 7, d: 23 }, end: { m: 8, d: 22 } },
  { name: "Virgo", start: { m: 8, d: 23 }, end: { m: 9, d: 22 } },
  { name: "Libra", start: { m: 9, d: 23 }, end: { m: 10, d: 22 } },
  { name: "Scorpio", start: { m: 10, d: 23 }, end: { m: 11, d: 21 } },
  { name: "Sagittarius", start: { m: 11, d: 22 }, end: { m: 12, d: 21 } },
  { name: "Capricorn", start: { m: 12, d: 22 }, end: { m: 12, d: 31 } },
]

function getZodiac(date: Date): string {
  const m = date.getMonth() + 1
  const d = date.getDate()
  for (const sign of zodiacSigns) {
    if (
      (m === sign.start.m && d >= sign.start.d) ||
      (m === sign.end.m && d <= sign.end.d) ||
      (m > sign.start.m && m < sign.end.m)
    ) {
      return sign.name
    }
  }
  return "Capricorn"
}

function calculateAge(dob: Date, refDate: Date): AgeResult {
  let years = refDate.getFullYear() - dob.getFullYear()
  let months = refDate.getMonth() - dob.getMonth()
  let days = refDate.getDate() - dob.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(refDate.getFullYear(), refDate.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  const diffMs = refDate.getTime() - dob.getTime()
  const totalSeconds = Math.floor(diffMs / 1000)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const totalHours = Math.floor(totalMinutes / 60)
  const totalDays = Math.floor(totalHours / 24)

  const hours = refDate.getHours() - dob.getHours()
  const minutes = refDate.getMinutes() - dob.getMinutes()
  const seconds = refDate.getSeconds() - dob.getSeconds()

  // Next birthday
  const nextBirthday = new Date(refDate.getFullYear(), dob.getMonth(), dob.getDate())
  if (nextBirthday < refDate) {
    nextBirthday.setFullYear(refDate.getFullYear() + 1)
  }
  const diffToBirthday = nextBirthday.getTime() - refDate.getTime()
  const daysToBirthday = Math.ceil(diffToBirthday / (1000 * 60 * 60 * 24))

  const isBirthday = dob.getMonth() === refDate.getMonth() && dob.getDate() === refDate.getDate()

  return {
    years, months, days, hours, minutes, seconds,
    totalDays, totalHours, totalMinutes, totalSeconds,
    nextBirthday: isBirthday ? "Today!" : `${daysToBirthday} days`,
    zodiac: getZodiac(dob),
    isBirthday,
  }
}

export default function AgeCalculator() {
  const [dob, setDob] = useState("")
  const [refDate, setRefDate] = useState(new Date().toISOString().split("T")[0])
  const [result, setResult] = useState<AgeResult | null>(null)

  const handleCalculate = () => {
    if (!dob) return
    const dobDate = new Date(dob)
    const ref = new Date(refDate)
    if (isNaN(dobDate.getTime()) || isNaN(ref.getTime())) return
    setResult(calculateAge(dobDate, ref))
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Date of Birth
              </label>
              <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Reference Date
              </label>
              <Input type="date" value={refDate} onChange={(e) => setRefDate(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleCalculate} disabled={!dob}>
            <CalendarDays className="size-4" />
            Calculate Age
          </Button>
          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatBox label="Years" value={result.years} />
                <StatBox label="Months" value={result.months} />
                <StatBox label="Days" value={result.days} />
                <StatBox label="Hours" value={result.hours} />
                <StatBox label="Minutes" value={result.minutes} />
                <StatBox label="Seconds" value={result.seconds} />
                <StatBox label="Total Days" value={result.totalDays.toLocaleString()} />
                <StatBox label="Total Hours" value={result.totalHours.toLocaleString()} />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatBox label="Total Minutes" value={result.totalMinutes.toLocaleString()} />
                <StatBox label="Total Seconds" value={result.totalSeconds.toLocaleString()} />
                <StatBox label="Zodiac Sign" value={result.zodiac} />
                <StatBox label="Next Birthday" value={result.nextBirthday} />
              </div>
              {result.isBirthday && (
                <div className="rounded-lg bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900 p-4 text-center text-sm font-medium text-pink-700 dark:text-pink-300">
                  🎉 Happy Birthday! 🎉
                </div>
              )}
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
