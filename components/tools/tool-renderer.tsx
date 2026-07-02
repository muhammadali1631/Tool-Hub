"use client"

import dynamic from "next/dynamic"

const WordCounter = dynamic(() => import("./implementations/word-counter"), { ssr: false })
const CaseConverter = dynamic(() => import("./implementations/case-converter"), { ssr: false })
const TextToSlug = dynamic(() => import("./implementations/text-to-slug"), { ssr: false })
const PlagiarismChecker = dynamic(() => import("./implementations/plagiarism-checker"), { ssr: false })
const GrammarChecker = dynamic(() => import("./implementations/grammar-checker"), { ssr: false })
const UnitConverter = dynamic(() => import("./implementations/unit-converter"), { ssr: false })
const CurrencyConverter = dynamic(() => import("./implementations/currency-converter"), { ssr: false })
const NumberToWords = dynamic(() => import("./implementations/number-to-words"), { ssr: false })
const BinaryConverter = dynamic(() => import("./implementations/binary-converter"), { ssr: false })
const ImageConverter = dynamic(() => import("./implementations/image-converter"), { ssr: false })
const QRCodeGenerator = dynamic(() => import("./implementations/qr-code-generator"), { ssr: false })
const PasswordGenerator = dynamic(() => import("./implementations/password-generator"), { ssr: false })
const RandomNumberGenerator = dynamic(() => import("./implementations/random-number-generator"), { ssr: false })
const UsernameGenerator = dynamic(() => import("./implementations/username-generator"), { ssr: false })
const FakeNameGenerator = dynamic(() => import("./implementations/fake-name-generator"), { ssr: false })
const LoanCalculator = dynamic(() => import("./implementations/loan-calculator"), { ssr: false })
const AgeCalculator = dynamic(() => import("./implementations/age-calculator"), { ssr: false })
const PercentageCalculator = dynamic(() => import("./implementations/percentage-calculator"), { ssr: false })
const BMICalculator = dynamic(() => import("./implementations/bmi-calculator"), { ssr: false })
const DaysCalculator = dynamic(() => import("./implementations/days-calculator"), { ssr: false })

export default function ToolRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case "word-counter":
      return <WordCounter />
    case "case-converter":
      return <CaseConverter />
    case "text-to-slug":
      return <TextToSlug />
    case "plagiarism-checker":
      return <PlagiarismChecker />
    case "grammar-checker":
      return <GrammarChecker />
    case "unit-converter":
      return <UnitConverter />
    case "currency-converter":
      return <CurrencyConverter />
    case "number-to-words":
      return <NumberToWords />
    case "binary-converter":
      return <BinaryConverter />
    case "image-converter":
      return <ImageConverter />
    case "qr-code-generator":
      return <QRCodeGenerator />
    case "password-generator":
      return <PasswordGenerator />
    case "random-number-generator":
      return <RandomNumberGenerator />
    case "username-generator":
      return <UsernameGenerator />
    case "fake-name-generator":
      return <FakeNameGenerator />
    case "loan-calculator":
      return <LoanCalculator />
    case "age-calculator":
      return <AgeCalculator />
    case "percentage-calculator":
      return <PercentageCalculator />
    case "bmi-calculator":
      return <BMICalculator />
    case "days-calculator":
      return <DaysCalculator />
    default:
      return (
        <div className="flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">Tool not found</p>
        </div>
      )
  }
}
