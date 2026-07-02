"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface EMIData {
  emi: number
  totalInterest: number
  totalPayment: number
  schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[]
}

function calculateEMI(principal: number, annualRate: number, years: number): EMIData {
  const monthlyRate = annualRate / 12 / 100
  const months = years * 12
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayment = emi * months
  const totalInterest = totalPayment - principal

  const schedule: EMIData["schedule"] = []
  let balance = principal
  for (let y = 1; y <= years; y++) {
    let yearlyPrincipal = 0
    let yearlyInterest = 0
    for (let m = 1; m <= 12; m++) {
      const interestPart = balance * monthlyRate
      const principalPart = emi - interestPart
      balance -= principalPart
      yearlyPrincipal += principalPart
      yearlyInterest += interestPart
    }
    schedule.push({ year: y, principalPaid: yearlyPrincipal, interestPaid: yearlyInterest, balance: Math.max(0, balance) })
  }

  return { emi, totalInterest, totalPayment, schedule }
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState("500000")
  const [rate, setRate] = useState("8.5")
  const [tenure, setTenure] = useState("5")
  const [result, setResult] = useState<EMIData | null>(null)

  const calculate = () => {
    const p = parseFloat(amount)
    const r = parseFloat(rate)
    const t = parseFloat(tenure)
    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) return
    setResult(calculateEMI(p, r, t))
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Loan Amount ($)
              </label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Annual Interest Rate (%)
              </label>
              <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Loan Tenure (Years)
              </label>
              <Input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} min={1} />
            </div>
          </div>
          <Button onClick={calculate} className="w-full sm:w-auto">
            Calculate EMI
          </Button>
          {result && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-4 text-center">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">Monthly EMI</div>
                  <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    ${result.emi.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4 text-center">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">Total Interest</div>
                  <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    ${result.totalInterest.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-4 text-center">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">Total Payment</div>
                  <div className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    ${result.totalPayment.toFixed(2)}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Yearly Amortization Schedule
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-zinc-700">
                        <th className="py-2 pr-4 font-medium text-zinc-500">Year</th>
                        <th className="py-2 pr-4 font-medium text-zinc-500">Principal Paid</th>
                        <th className="py-2 pr-4 font-medium text-zinc-500">Interest Paid</th>
                        <th className="py-2 font-medium text-zinc-500">Remaining Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.year} className="border-b border-zinc-100 dark:border-zinc-800">
                          <td className="py-2 pr-4 font-medium text-zinc-900 dark:text-zinc-50">{row.year}</td>
                          <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400">${row.principalPaid.toFixed(2)}</td>
                          <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400">${row.interestPaid.toFixed(2)}</td>
                          <td className="py-2 text-zinc-600 dark:text-zinc-400">${row.balance.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="relative h-48 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4">
                <div className="flex h-full items-center justify-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded bg-blue-500" />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Principal (${parseFloat(amount).toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded bg-amber-500" />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Interest (${result.totalInterest.toFixed(0)})</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
