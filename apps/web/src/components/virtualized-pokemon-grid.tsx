import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react"
import { usePokemonInfinite } from "../ts-query/hooks/hooks"
import { useWindowVirtualizer } from "@tanstack/react-virtual"
import { useInView } from "react-intersection-observer"
import { PokemonGridSkeleton } from "./pokemon-grid-skeleton"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { PokemonCard } from "./pokemon-card"
import { Link } from "@tanstack/react-router"
import { CARD_HEIGHT, GAP, MIN_CARD_WIDTH } from "@/constants"

function useColumns(container: HTMLElement | null) {
  const [columns, setColumns] = useState(1)

  useLayoutEffect(() => {
    if (!container) return
    const ro = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width
      setColumns(
        Math.max(1, Math.floor((width + GAP) / (MIN_CARD_WIDTH + GAP)))
      )
    })
    ro.observe(container)
    return () => ro.disconnect()
  }, [container])

  return columns
}

export function VirtualizedPokemonGrid() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    status,
    error,
    refetch,
  } = usePokemonInfinite()

  const items = useMemo(() => data?.pages.flatMap((p) => p.items) ?? [], [data])

  // State-based ref so effects re-run once the list actually mounts
  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const columns = useColumns(container)
  const rowCount = Math.ceil(items.length / columns)

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => CARD_HEIGHT + GAP,
    overscan: 4,
    scrollMargin: container?.offsetTop ?? 0,
  })

  // Sentinel sits right below the virtualized list
  const { ref: sentinelRef, inView } = useInView({ rootMargin: "600px 0px" })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isFetchNextPageError) {
      fetchNextPage()
    }
    // Re-runs when a fetch settles, so loading continues if the sentinel is still visible
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
  ])

  if (status === "pending") return <PokemonGridSkeleton />

  if (status === "error") {
    return (
      <div className="mx-auto max-w-xl p-4">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Couldn't load Pokémon</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-4">
            {error.message}
            <Button size="sm" variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div
        ref={setContainer}
        className="relative w-full"
        style={{ height: virtualizer.getTotalSize() }}
      >
        {virtualizer.getVirtualItems().map((row) => {
          const start = row.index * columns
          const rowItems = items.slice(start, start + columns)

          return (
            <div
              key={row.key}
              className="absolute top-0 left-0 grid w-full grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
              style={
                {
                  "--cols": columns,
                  gap: GAP,
                  height: CARD_HEIGHT,
                  transform: `translateY(${row.start - virtualizer.options.scrollMargin}px)`,
                } as CSSProperties
              }
            >
              {rowItems.map((p) => (
                <Link
                  key={p.id}
                  to={`/pokemon/$pokemonId`}
                  params={{ pokemonId: String(p.id) }}
                >
                  <PokemonCard key={p.id} pokemon={p} />
                </Link>
              ))}
            </div>
          )
        })}
      </div>

      <div
        ref={sentinelRef}
        className="flex h-16 items-center justify-center text-sm text-muted-foreground"
      >
        {isFetchingNextPage ? (
          <Loader2 className="size-5 animate-spin" />
        ) : isFetchNextPageError ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => (fetchNextPage as () => unknown)()}
          >
            Failed to load more. Retry
          </Button>
        ) : !hasNextPage ? (
          "That's all of them!"
        ) : null}
      </div>
    </div>
  )
}
