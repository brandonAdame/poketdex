import type { PokemonResponse, PokemonListResult } from "@/types/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"
import { Card, CardHeader, CardTitle } from "@workspace/ui/components/card"

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
    <div className="grid grid-cols-3 gap-3">
      {data.results.map((pokemon: PokemonListResult) => (
        <Card key={pokemon.name} className="w-sm max-w-full">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{pokemon.name}</CardTitle>

            <Button
              variant="outline"
              render={
                <Link
                  to={"/pokemon/$pokemonId"}
                  params={{ pokemonId: pokemon.name }}
                />
              }
            >
              View
            </Button>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
