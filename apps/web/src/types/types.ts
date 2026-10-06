export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string
  }
}

export interface PokemonListResult {
  name: string
  url: string
}

export interface PokemonResponse {
  count: number
  previous: string | null
  results: PokemonListResult[]
}
