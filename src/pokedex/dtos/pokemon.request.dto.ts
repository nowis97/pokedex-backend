import { PokemonListRequest } from "./pokemon-list.request.dto";

export interface PokemonRequest extends Omit<PokemonListRequest, 'url'> {
    id: number;
    sprites: {other: {'official-artwork': {front_default: string}}}
}