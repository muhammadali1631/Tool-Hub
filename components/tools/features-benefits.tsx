import { Check } from "lucide-react"

interface FeaturesBenefitsProps {
  features: string[]
  benefits: string[]
}

export function FeaturesBenefits({ features, benefits }: FeaturesBenefitsProps) {
  const hasFeatures = features.length > 0
  const hasBenefits = benefits.length > 0

  if (!hasFeatures && !hasBenefits) return null

  return (
    <section className="mb-12">
      <div className="grid gap-8 md:grid-cols-2">
        {hasFeatures && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Features
            </h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <Check className="size-3" />
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {hasBenefits && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Benefits
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Check className="size-3" />
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
