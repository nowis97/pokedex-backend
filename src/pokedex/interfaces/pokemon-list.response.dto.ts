export interface PokemonListResponse {
    results: PokemonResult[];
}

export interface PokemonResult {
    name: string;
    url: string;
}