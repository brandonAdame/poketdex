// import type { Pokemon } from "@/types/types"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useState } from "react"

type Pokemon = { id: number; name: string; image: string }

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const [loaded, setLoaded] = useState(false)

  return (
    // h-full: height comes from the virtual row. gap/py override Card's defaults.
    <Card className="h-full gap-2 overflow-hidden py-3 transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader>
        <CardTitle>
          <Badge variant="secondary">
            #{pokemon.id.toString().padStart(3, "0")}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex flex-1 items-center justify-center px-3">
        {!loaded && <Skeleton className="absolute size-40 rounded-lg" />}
        <img
          src={pokemon.image}
          alt={pokemon.name}
          width={100}
          height={100}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`size-25 object-contain transition-opacity ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </CardContent>
      <CardFooter className="flex-col gap-1 px-3">
        <p className="w-full truncate text-center text-sm font-medium capitalize">
          {pokemon.name}
        </p>
      </CardFooter>
    </Card>
  )
}
