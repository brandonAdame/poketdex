import { infiniteQueryOptions } from "@tanstack/react-query"
import { fetchPokemonPage } from "../functions/query-functions"

export const pokemonQueryOptions = infiniteQueryOptions({
  queryKey: ["pokemon"],
  queryFn: ({ pageParam }) => fetchPokemonPage(pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextOffset, // undefined → hasNextPage = false
  staleTime: Infinity, // Pokémon data doesn't change
})
