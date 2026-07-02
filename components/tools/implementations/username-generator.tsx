"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/tools/copy-button"
import { UserPlus, RefreshCw } from "lucide-react"

const adjectives = [
  "cool", "awesome", "epic", "super", "mega", "ultra", "hyper", "neo", "cyber", "digital",
  "swift", "bold", "brave", "cosmic", "dark", "electric", "frost", "golden", "hidden", "iron",
  "jade", "keen", "lunar", "mystic", "nova", "omega", "phantom", "quantum", "rapid", "shadow",
  "sharp", "silent", "smart", "stealth", "storm", "sunny", "swift", "turbo", "vivid", "wild",
]

const nouns = [
  "tiger", "eagle", "panda", "wolf", "hawk", "fox", "lion", "bear", "phoenix", "dragon",
  "falcon", "shark", "whale", "raven", "viper", "panther", "jaguar", "cheetah", "gryphon", "kraken",
  "ace", "archer", "bandit", "blade", "blaze", "bolt", "boss", "champ", "chief", "cipher",
  "claw", "cobra", "code", "core", "crusher", "cyclone", "dash", "droid", "ember", "fang",
]

const styles = [
  { value: "cool", label: "Cool" },
  { value: "funny", label: "Funny" },
  { value: "professional", label: "Professional" },
  { value: "random", label: "Random" },
] as const

function generateUsernames(style: string, keyword: string, count: number): string[] {
  const result: string[] = []
  const used = new Set<string>()

  for (let i = 0; i < count * 3 && result.length < count; i++) {
    let username = ""
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    const num = Math.floor(Math.random() * 999) + 1

    switch (style) {
      case "cool":
        username = `${adj}_${noun}${num}`
        break
      case "funny":
        username = `${adj}${noun}${num}`
        break
      case "professional":
        username = `${adj}.${noun}`
        break
      default:
        username = Math.random() > 0.5
          ? `${adj}${noun}${num}`
          : `${noun}${adj}${num}`
    }

    if (keyword) {
      username = `${keyword}${Math.random() > 0.5 ? "_" : ""}${username}`
    }

    if (!used.has(username)) {
      used.add(username)
      result.push(username)
    }
  }

  return result.slice(0, count)
}

export default function UsernameGenerator() {
  const [style, setStyle] = useState<string>("cool")
  const [keyword, setKeyword] = useState("")
  const [usernames, setUsernames] = useState<string[]>([])
  const [count] = useState(10)

  const generate = () => {
    setUsernames(generateUsernames(style, keyword, count))
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {styles.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Keyword (optional)
              </label>
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. gamer"
              />
            </div>
          </div>
          <Button onClick={generate} className="w-full sm:w-auto">
            <UserPlus className="size-4" />
            Generate Usernames
          </Button>
          {usernames.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Generated Usernames
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={generate}>
                    <RefreshCw className="size-3" />
                    Regenerate
                  </Button>
                  <CopyButton text={usernames.join("\n")} label="Copy All" />
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {usernames.map((u, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2.5"
                  >
                    <span className="text-sm font-mono text-zinc-900 dark:text-zinc-50">{u}</span>
                    <CopyButton text={u} />
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
