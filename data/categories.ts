import type { ToolCategory } from "@/types"

export const categories: ToolCategory[] = [
  {
    id: "text-tools",
    name: "Text Tools",
    slug: "text-tools",
    description: "Powerful text processing tools to help you edit, analyze, and transform text content",
    icon: "FileText",
  },
  {
    id: "converter-tools",
    name: "Converter Tools",
    slug: "converter-tools",
    description: "Convert between different formats and units with ease",
    icon: "Repeat",
  },
  {
    id: "generator-tools",
    name: "Generator Tools",
    slug: "generator-tools",
    description: "Generate passwords, codes, usernames, and random data instantly",
    icon: "Sparkles",
  },
  {
    id: "calculator-tools",
    name: "Calculator Tools",
    slug: "calculator-tools",
    description: "Calculate loans, percentages, age, BMI, and date differences",
    icon: "Calculator",
  },
]
