import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokedexService } from '../services/pokedex.service';

@Controller('pokemon')
export class PokedexController {
  constructor(private readonly pokedexService: PokedexService) {}

  @Get()
  getPokemons(@Query('offset') offset: number, @Query('limit') limit: number) {
    return this.pokedexService.getPokemons(offset, limit);
  }

  @Get('search')
  searchPokemon(@Query('q') query: string) {
    return this.pokedexService.searchPokemon(query);
  }

  @Get(':id_or_name')
  getPokemon(@Param('id_or_name') idOrName: string) {
    return this.pokedexService.getPokemon(idOrName);
  }
}
