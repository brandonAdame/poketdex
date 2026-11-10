import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { ErrorBoundary } from "react-error-boundary"
import { VirtualizedPokemonGrid } from "@/components/virtualized-pokemon-grid"

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
    <div className="p-4">
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={fallbackUI()}>
          <VirtualizedPokemonGrid />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
