import { useEffect } from "react"
import { pokeClient } from "@/pokedex"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/pokemon/form/$pokemonId")({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    const showPokemon = async () => {
      try {
        const resp = await pokeClient.listPokemons()
        console.log(resp)
      } catch (error) {
        console.error("Failed to load Pokémon:", error)
      }
    }

    void showPokemon()
  }, [])

  return <div>Hello "/pokemon/form/$pokemonId"!</div>
}
