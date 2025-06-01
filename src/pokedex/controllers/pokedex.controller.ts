import { Controller, Get, Query } from '@nestjs/common';
import { PokedexService } from '../services/pokedex.service';

@Controller('pokedex')
export class PokedexController {
    constructor(private readonly pokedexService: PokedexService) { }

    @Get()
    getPokemons(@Query('offset') offset: number, @Query('limit') limit: number) {
        return this.pokedexService.getPokemons(offset, limit);
    }
}
