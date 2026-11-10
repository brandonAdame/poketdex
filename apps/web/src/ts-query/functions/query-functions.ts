import type { PokemonResponse } from "@/types/types"

const PAGE_SIZE = 48

export async function fetchPokemonPage(offset: number) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  )
  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon")
  }
  const data = (await res.json()) as PokemonResponse

  return {
    items: data.results.map((pokemon) => {
      const id = Number(pokemon.url.split("/").filter(Boolean).pop())
      return {
        id,
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`,
      }
    }),
    nextOffset: data.next ? offset + PAGE_SIZE : undefined,
  }
}
