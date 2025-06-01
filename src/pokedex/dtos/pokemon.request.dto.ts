import { PokemonResult } from "./pokemon-list.request.dto";

export interface PokemonRequest extends Omit<PokemonResult, 'url'> {
    id: number;
    sprites: {other: {'official-artwork': {front_default: string}}}
}