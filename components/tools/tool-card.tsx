"use client"

import Link from "next/link"
import * as Icons from "lucide-react"
import { motion } from "framer-motion"
import type { Tool } from "@/types"
import { truncate } from "@/lib/utils"

interface ToolCardProps {
  tool: Tool
  index?: number
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const IconComponent = tool.icon
    ? (Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }> | undefined)
    : undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/tools/${tool.slug}`}
        className="group relative block rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02]"
      >
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="relative rounded-xl bg-white dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 group-hover:ring-transparent transition-all duration-300 p-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              {IconComponent ? (
                <IconComponent className="size-6" />
              ) : (
                <Icons.Wrench className="size-6" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {tool.name}
                </h3>
                {tool.isNew && (
                  <span className="rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                    New
                  </span>
                )}
                {tool.isPopular && (
                  <span className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                    Popular
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {truncate(tool.description, 100)}
              </p>
              <span className="mt-3 inline-flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {tool.category.name}
              </span>
            </div>
            <Icons.ChevronRight className="mt-1 size-5 shrink-0 text-zinc-400 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
