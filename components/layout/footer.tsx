import Link from "next/link"
import { Globe, Hash, Code, Link2 } from "lucide-react"

const categories = [
  { href: "/tools", label: "All Tools" },
  { href: "/text-tools", label: "Text Tools" },
  { href: "/converter-tools", label: "Converter Tools" },
  { href: "/generator-tools", label: "Generator Tools" },
  { href: "/calculator-tools", label: "Calculator Tools" },
]

const links = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/sitemap", label: "Sitemap" },
]

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: Globe },
  { href: "https://twitter.com", label: "Twitter", icon: Hash },
  { href: "https://github.com", label: "GitHub", icon: Code },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Link2 },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-50"
            >
              ToolHub
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              A comprehensive collection of free online tools for text processing,
              file conversion, content generation, and calculations. Simplify your
              workflow with our easy-to-use tool suite.
            </p>
            {/* <div className="mt-4 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div> */}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Categories
            </h3>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Links
            </h3>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">
          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ToolHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
