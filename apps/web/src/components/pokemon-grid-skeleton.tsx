import { CARD_HEIGHT } from "@/constants"
import { Skeleton } from "@workspace/ui/components/skeleton"

export function PokemonGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: count }, (_, i) => (
          <Skeleton
            key={i}
            className="rounded-xl"
            style={{ height: CARD_HEIGHT }}
          />
        ))}
      </div>
    </div>
  )
}
