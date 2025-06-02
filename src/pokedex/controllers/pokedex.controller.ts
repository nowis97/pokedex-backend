import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokedexService } from '../services/pokedex.service';
import { Pokemon } from '../dtos/pokemon.dto';
import { PokemonError } from '../dtos/pokemon-error.dto';
import {
  ApiOkResponse,
} from '@nestjs/swagger';
import { PokemonDetails } from '../dtos/pokemon-details.dto';

@Controller('pokemon')
export class PokedexController {
  constructor(private readonly pokedexService: PokedexService) {}

  @ApiOkResponse({
    type: Pokemon,
    isArray: true,
  })
  @Get()
  getPokemons(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<Array<Pokemon | PokemonError>> {
    return this.pokedexService.getPokemons(offset, limit);
  }

  @ApiOkResponse({
    type: Pokemon,
    isArray: true,
  })
  @Get('search')
  searchPokemon(@Query('q') query: string) {
    return this.pokedexService.searchPokemon(query);
  }

  @ApiOkResponse({
    type: PokemonDetails,
  })
  @Get(':id_or_name')
  getPokemon(@Param('id_or_name') idOrName: string) {
    return this.pokedexService.getPokemon(idOrName);
  }
}
