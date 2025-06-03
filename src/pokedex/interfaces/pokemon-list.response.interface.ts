export interface PokemonListResponse {
  results: PokemonResult[];
  count: number;
}

export interface PokemonResult {
  name: string;
  url: string;
}
