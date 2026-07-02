import type { Tool } from "@/types"
import { ToolCard } from "./tool-card"

interface RelatedToolsProps {
  tools: Tool[]
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  const displayTools = tools.slice(0, 4)

  if (displayTools.length === 0) return null

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Related Tools
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayTools.map((tool, index) => (
          <ToolCard key={tool.id} tool={tool} index={index} />
        ))}
      </div>
    </section>
  )
}
