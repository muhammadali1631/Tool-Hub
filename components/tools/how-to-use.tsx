import { ListOrdered } from "lucide-react"

interface HowToUseProps {
  steps: string[]
}

export function HowToUse({ steps }: HowToUseProps) {
  if (steps.length === 0) return null

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
          <ListOrdered className="size-5" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          How to Use
        </h2>
      </div>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <p className="pt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {step}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
