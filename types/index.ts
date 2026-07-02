export interface Tool {
  id: string
  name: string
  slug: string
  category: ToolCategory
  description: string
  icon: string
  keywords: string[]
  seoTitle: string
  seoDescription: string
  faq: FAQItem[]
  howToUse: string[]
  features: string[]
  benefits: string[]
  relatedTools: string[]
  isPopular?: boolean
  isNew?: boolean
}

export interface FAQItem {
  question: string
  answer: string
}

export type ToolCategory = {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

export interface SearchResult {
  tool: Tool
  matchType: 'name' | 'category' | 'description' | 'keyword'
}
