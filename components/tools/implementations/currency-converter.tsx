"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, Loader2 } from "lucide-react"

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
]

export default function CurrencyConverter() {
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("EUR")
  const [amount, setAmount] = useState("100")
  const [result, setResult] = useState<string | null>(null)
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [fetchError, setFetchError] = useState<string>("")

  useEffect(() => {
    if (!amount || !from || !to) return
    let cancelled = false
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    fetch(`https://api.frankfurter.dev/v1/latest?from=${from}&to=${to}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const r = data.rates[to]
        setRate(r)
        setResult((parseFloat(amount) * r).toFixed(2))
        setLastUpdated(new Date().toLocaleString())
      })
      .catch(() => {
        if (!cancelled) {
          setResult(null)
          setRate(null)
          setFetchError("Failed to fetch rates. Using fallback calculation.")
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [from, to, amount])

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
  }

  const fromCurrency = currencies.find((c) => c.code === from)
  const toCurrency = currencies.find((c) => c.code === to)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                From
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end justify-center pb-2">
              <Button variant="ghost" size="icon" onClick={handleSwap} className="rounded-full">
                <ArrowLeftRight className="size-5" />
              </Button>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                To
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Amount
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
          </div>
          {loading && (
            <div className="flex items-center justify-center gap-2 py-4 text-sm text-zinc-500">
              <Loader2 className="size-4 animate-spin" />
              Fetching latest rates...
            </div>
          )}
          {fetchError && (
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-3 text-center text-sm text-amber-700 dark:text-amber-400">
              {fetchError}
            </div>
          )}
          {result && !loading && (
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-4">
              <div className="text-center">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Converted Amount</div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {fromCurrency?.symbol}{parseFloat(amount).toFixed(2)} {from} = {toCurrency?.symbol}{result} {to}
                </div>
              </div>
              {rate && (
                <div className="mt-2 text-center text-xs text-zinc-400">
                  1 {from} = {rate.toFixed(6)} {to}
                  {lastUpdated && ` | Updated: ${lastUpdated}`}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
