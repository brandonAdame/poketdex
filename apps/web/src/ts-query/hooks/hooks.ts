import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import {
  pokemonQueryOptions,
  pokemonNamesQueryOptions,
} from "../options/options"

export const usePokemonInfinite = () => useInfiniteQuery(pokemonQueryOptions)

export const usePokemonNames = () => useQuery(pokemonNamesQueryOptions)
