import type { PokemonResponse, PokemonListResult } from "@/types/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export function Dashboard() {
  const { data } = useSuspenseQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon")

      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon")
      }
      return (await response.json()) as PokemonResponse
    },
  })

  return (
    <div className="flex w-full flex-wrap gap-3">
      {data.results.map((pokemon: PokemonListResult) => (
        <Card key={pokemon.name} className="w-64">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{pokemon.name}</CardTitle>

            <Button
              variant="outline"
              nativeButton={false}
              render={
                <Link
                  to={"/pokemon/$pokemonId"}
                  params={{ pokemonId: pokemon.name }}
                >
                  View
                </Link>
              }
            />
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      ))}
    </div>
  )
}
