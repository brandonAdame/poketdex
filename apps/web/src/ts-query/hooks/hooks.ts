import { useInfiniteQuery } from "@tanstack/react-query"
import { pokemonQueryOptions } from "../options/options"

export const usePokemonInfinite = () => useInfiniteQuery(pokemonQueryOptions)
