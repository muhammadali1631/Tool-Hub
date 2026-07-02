import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${process.env.NEXT_PUBLIC_URL ?? ""}${item.href}` } : {}),
    })),
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            <Home className="size-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="size-4 shrink-0" />
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-900 dark:text-zinc-50 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
