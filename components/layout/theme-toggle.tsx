"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"
import { useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

const themes = ["light", "dark", "system"] as const

const themeIcons = {
  light: Moon,
  dark: Sun,
  system: Monitor,
} as const

const themeLabels: Record<string, string> = {
  light: "Switch to dark mode",
  dark: "Switch to system theme",
  system: "Switch to light mode",
}

const emptySubscribe = () => () => {}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-gray-200 dark:border-gray-700" />
    )
  }

  const currentTheme = theme ?? "system"
  const currentIndex = themes.indexOf(currentTheme as (typeof themes)[number])
  const nextTheme = themes[(currentIndex + 1) % themes.length]
  const Icon = themeIcons[currentTheme as keyof typeof themeIcons] ?? Sun

  return (
    <button
      onClick={() => setTheme(nextTheme)}
      className={cn(
        "rounded-lg border p-2 transition-colors",
        "border-gray-200 text-gray-600 hover:bg-gray-100",
        "dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
      )}
      aria-label={themeLabels[currentTheme]}
    >
      <Icon className="h-5 w-5" />
    </button>
  )
}
