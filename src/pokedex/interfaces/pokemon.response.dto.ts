import { PokemonResult } from "./pokemon-list.response.dto";

export interface PokemonResponse extends Omit<PokemonResult, 'url'> {
    id: number;
    sprites: Sprites;
    height: number;
    weight: number;
    types: Type[];
    stats: Stats[];
}

interface Stats {
    base_stat: number;
    effort: number;
    stat: {name: string};
}

interface Type {
    name: string;
    url: string;
}

interface Sprites {
    other: Other;
}

interface Other {
    'official-artwork': {
        front_default: string;
    };

    showdown: {
        back_default: string;
        front_default: string;
    };
}
