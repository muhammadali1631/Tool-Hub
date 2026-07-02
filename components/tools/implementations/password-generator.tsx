"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/tools/copy-button"
import { RefreshCw } from "lucide-react"

function generatePassword(length: number, useUpper: boolean, useLower: boolean, useNumbers: boolean, useSymbols: boolean): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lower = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  let chars = ""
  if (useUpper) chars += upper
  if (useLower) chars += lower
  if (useNumbers) chars += numbers
  if (useSymbols) chars += symbols
  if (!chars) return ""

  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((n) => chars[n % chars.length])
    .join("")
}

function getStrength(password: string): { label: string; color: string; score: number } {
  let score = 0
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
  if (/\d/.test(password)) score += 1
  if (/[^a-zA-Z0-9]/.test(password)) score += 1

  if (score <= 2) return { label: "Weak", color: "bg-red-500", score: 20 }
  if (score <= 3) return { label: "Fair", color: "bg-orange-500", score: 40 }
  if (score <= 4) return { label: "Good", color: "bg-yellow-500", score: 60 }
  if (score <= 5) return { label: "Strong", color: "bg-lime-500", score: 80 }
  return { label: "Very Strong", color: "bg-green-500", score: 100 }
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [useUpper, setUseUpper] = useState(true)
  const [useLower, setUseLower] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [password, setPassword] = useState("")

  const generate = useCallback(() => {
    setPassword(generatePassword(length, useUpper, useLower, useNumbers, useSymbols))
  }, [length, useUpper, useLower, useNumbers, useSymbols])

  const strength = useMemo(() => getStrength(password), [password])

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 font-mono text-sm text-zinc-900 dark:text-zinc-50 break-all">
              {password || (
                <span className="text-zinc-400">Click Generate to create a password</span>
              )}
            </div>
            {password && <CopyButton text={password} />}
            <Button variant="outline" size="icon" onClick={generate}>
              <RefreshCw className="size-4" />
            </Button>
          </div>
          {password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Strength: <strong>{strength.label}</strong></span>
                <span className="text-zinc-400">{password.length} characters</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                <div className={`h-full transition-all ${strength.color}`} style={{ width: `${strength.score}%` }} />
              </div>
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Length: {length}
            </label>
            <input
              type="range"
              min={4}
              max={128}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
          <div className="space-y-2">
            {[
              { label: "Uppercase (A-Z)", value: useUpper, set: setUseUpper },
              { label: "Lowercase (a-z)", value: useLower, set: setUseLower },
              { label: "Numbers (0-9)", value: useNumbers, set: setUseNumbers },
              { label: "Symbols (!@#$%)", value: useSymbols, set: setUseSymbols },
            ].map((opt) => (
              <label key={opt.label} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={opt.value}
                  onChange={() => opt.set(!opt.value)}
                  className="rounded border-zinc-300 dark:border-zinc-600"
                />
                {opt.label}
              </label>
            ))}
          </div>
          <Button onClick={generate} className="w-full">
            <RefreshCw className="size-4" />
            Generate Password
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
