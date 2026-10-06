import { createFileRoute } from "@tanstack/react-router"
import type { Pokemon } from "@/types/types"
import { Card, CardContent } from "@workspace/ui/components/card"

export const Route = createFileRoute("/pokemon/$pokemonId")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return await context.queryClient.query({
      queryKey: ["pokemon", params.pokemonId],
      queryFn: async () => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon")
        }
        return (await response.json()) as Pokemon
      },
    })
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div className="flex flex-col gap-9">
      <h1 className="text-center text-4xl font-bold">{data.name}</h1>
      <div className="mx-auto grid grid-cols-2 gap-20">
        <Card className="max-w-sm">
          <CardContent>
            <img
              src={data.sprites.front_default}
              alt={data.name}
              height={200}
              width={200}
            />
          </CardContent>
        </Card>
        <div>
          <p>Height: {data.height}</p>
          <p>Weight: {data.weight}</p>
        </div>
      </div>
    </div>
  )
}
