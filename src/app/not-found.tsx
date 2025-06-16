import Link from "next/link"
import { BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="m-auto container flex h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
        <BookOpen className="h-12 w-12 text-primary" />
      </div>
      <h1 className="mt-6 text-4xl font-bold">404</h1>
      <h2 className="mt-2 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for doesn&apos;t exist or has been moved. Please check the URL or navigate back to the
        homepage.
      </p>
      <Button className="mt-8" asChild>
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  )
}

