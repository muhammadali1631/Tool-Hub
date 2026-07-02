import Link from "next/link"
import { Frown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[30rem] rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[25rem] rounded-full bg-purple-400/20 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 size-[20rem] rounded-full bg-pink-400/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <Frown className="size-16 text-zinc-300 dark:text-zinc-600" />
        <h1 className="mt-4 text-8xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-zinc-800 dark:text-zinc-200">
          Page not found
        </h2>
        <p className="mt-2 max-w-md text-base text-zinc-600 dark:text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  )
}
