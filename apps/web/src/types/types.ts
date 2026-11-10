export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience?: number | null
  abilities: PokemonAbility[]
  moves: PokemonMove[]
  sprites: {
    front_default: string | null
    back_default: string | null
    front_shiny: string | null
    back_shiny: string | null
    other?: {
      "official-artwork"?: {
        front_default: string | null
      }
    }
  }
  forms: PokemonFormReference[]
  stats: PokemonStat[]
  types: PokemonType[]
}

export interface PokemonFormReference {
  name: string
  url: string
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonForm {
  id: number
  name: string
  order: number
  form_order: number
  is_default: boolean
  is_battle_only: boolean
  is_mega: boolean
  form_name: string
  pokemon: {
    name: string
    url: string
  }
  sprites: PokemonSprites
  types: PokemonType[]
}

export interface PokemonSprites {
  other: {
    // the gifs
    showdown: {
      back_shiny: string
      back_female?: string
      front_shiny: string
      back_default: string
      front_female?: string
      front_default: string
      back_shiny_female?: string
      front_shiny_female?: string
    }
  }
  versions: {
    "generation-i": PokemonFirstGenSprites
  }
  back_shiny: string
  back_female?: string
  front_shiny: string
  back_default: string
  front_female?: string
  front_default: string
}

export interface PokemonAbility {
  is_hidden: boolean
  slot: number
  ability: {
    name: string
    url: string
  }
}

export interface PokemonMove {
  move: {
    name: string
    url: string
  }
  version_group_details: {
    level_learned_at: number
    move_learn_method: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
    order?: number
  }[]
}

export interface PokemonListResult {
  name: string
  url: string
}

export interface PokemonResponse {
  count: number
  next?: string | null
  previous: string | null
  results: PokemonListResult[]
}

export interface PokemonFirstGenSprites {
  yellow: {
    back_gbc: string
    front_gbc: string
  }
}
