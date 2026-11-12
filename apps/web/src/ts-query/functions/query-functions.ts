import type { PokemonResponse } from "@/types/types"

const PAGE_SIZE = 48
const SEARCH_LIMIT = 2000

function toPokemonListItem(pokemon: { name: string; url: string }) {
  const id = Number(pokemon.url.split("/").filter(Boolean).pop())

  return {
    id,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`,
  }
}

export async function fetchPokemonPage(offset: number) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  )
  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon")
  }
  const data = (await res.json()) as PokemonResponse

  return {
    items: data.results.map(toPokemonListItem),
    nextOffset: data.next ? offset + PAGE_SIZE : undefined,
  }
}

export async function fetchPokemonNames() {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${SEARCH_LIMIT}`
  )
  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon names")
  }

  const data = (await res.json()) as PokemonResponse

  return data.results.map(toPokemonListItem)
}
