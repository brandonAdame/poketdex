import { createFileRoute } from "@tanstack/react-router"
import { Dashboard } from "@/components/dashboard"
import { Suspense } from "react"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { ErrorBoundary } from "react-error-boundary"

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const fallbackUI = () => (
    <div className="grid grid-cols-3 gap-3">
      <Skeleton className="col-span-1" />
      <Skeleton className="col-span-1" />
      <Skeleton className="col-span-1" />
    </div>
  )
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center gap-10 border border-dashed border-muted-foreground py-4">
        <h1 className="h1-primary">Dashboard</h1>
      </div>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={fallbackUI()}>
          <Dashboard />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
