export interface PokemonListRequest {
    results: PokemonResult[];
}

export interface PokemonResult {
    name: string;
    url: string;
}