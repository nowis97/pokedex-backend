import { ApiExtraModels, ApiProperty, refs } from "@nestjs/swagger";
import { PokemonError } from "./pokemon-error.dto";
import { Pokemon } from "./pokemon.dto";

@ApiExtraModels(PokemonError, Pokemon)
export class PokemonListResponseDTO {
    @ApiProperty({
        description: 'Total count of pokemons'
    })
    count: number;

    @ApiProperty({
        description: 'Array of pokemons',
        type: 'array',
        items: {
            oneOf: refs(Pokemon, PokemonError)
        }
    })
    results: Array<Pokemon | PokemonError>;
}