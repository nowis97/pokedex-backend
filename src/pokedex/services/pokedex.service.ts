import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { PokemonListRequest } from '../dtos/pokemon-list.request.dto';
import { AxiosResponse } from 'axios';
import { PokemonRequest } from '../dtos/pokemon.request.dto';
import { Pokemon } from '../dtos/pokemon.dto';
import { PokemonError } from '../dtos/pokemon-error.dto';

@Injectable()
export class PokedexService {
    constructor(private readonly httpService: HttpService) { }

    private getListPokemons(offset: number = 0, limit: number = 20): Promise<PokemonListRequest[]> {
        const queryParams = {
            offset,
            limit
        }

        return firstValueFrom(this.httpService.get<PokemonListRequest[]>('/pokemon', { params: queryParams }).pipe(map(response => response.data)));
    }

    private getPokemonFromURL(url: string): Promise<PokemonRequest> {
        return firstValueFrom(this.httpService.get<PokemonRequest>(url, { baseURL: '' }).pipe(map(response => response.data)));
    }

    async getPokemons(offset: number, limit: number) {
        const pokemons = await this.getListPokemons(offset, limit);
        const promisePokemons = pokemons.map(pokemon => this.getPokemonFromURL(pokemon.url));
        const detailsPokemons = await Promise.allSettled(promisePokemons);

        return detailsPokemons.map(pokemonPromise => {
            if (pokemonPromise.status === 'fulfilled') {
                return {
                    id: pokemonPromise.value.id,
                    name: pokemonPromise.value.name,
                    frontSprite: pokemonPromise.value.sprites.other['official-artwork'].front_default
                } as Pokemon;
            } else {
                return {
                    id: null,
                    error: pokemonPromise.reason as string
                } as PokemonError;
            }
        })
    }
}



