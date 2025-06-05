import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import {
  PokemonListResponse,
  PokemonResult,
} from '../interfaces/pokemon-list.response.interface';
import { Pokemon } from '../dtos/pokemon.dto';
import { PokemonError } from '../dtos/pokemon-error.dto';
import { AxiosError } from 'axios';
import { PokemonDetails } from '../dtos/pokemon-details.dto';
import { PokemonListResponseDTO } from '../dtos/pokemon-list.response.dto';

@Injectable()
export class PokedexService {
  constructor(private readonly httpService: HttpService) {}

  private getListPokemons(
    offset: number = 0,
    limit: number = 20,
  ): Promise<PokemonListResponse> {
    const queryParams = {
      offset,
      limit,
    };

    return firstValueFrom(
      this.httpService
        .get<PokemonListResponse>('/pokemon', { params: queryParams })
        .pipe(map((response) => response.data)),
    );
  }

  private getPokemonFromURL(url: string): Promise<PokemonDetails> {
    return firstValueFrom(
      this.httpService
        .get<PokemonDetails>(url, { baseURL: '' })
        .pipe(map((response) => response.data)),
    );
  }

  async getPokemon(idOrName: string): Promise<PokemonDetails> {
    return firstValueFrom(
      this.httpService
        .get<PokemonDetails>(`/pokemon/${idOrName}`)
        .pipe(map((response) => response.data)),
    ).catch((reason: AxiosError) => {
      throw new HttpException(reason.message, reason.status!);
    });
  }

  async getPokemons(
    offset: number,
    limit: number,
  ): Promise<PokemonListResponseDTO> {
    let response: PokemonListResponse | undefined;
    try {
      response = await this.getListPokemons(offset, limit);
    } catch (e) {
      throw e;
    }
    const promisePokemons =
      response?.results?.map((pokemon) =>
        this.getPokemonFromURL(pokemon.url),
      ) ?? [];
    const detailsPokemons = await Promise.allSettled(promisePokemons);

    const responseDetailsPokemons = detailsPokemons.map((pokemonPromise) => {
      if (pokemonPromise.status === 'fulfilled') {
        return {
          id: pokemonPromise.value.id,
          name: pokemonPromise.value.name,
          frontSprite:
            pokemonPromise.value.sprites.other['official-artwork']
              .front_default,
        } as Pokemon;
      } else {
        return {
          error: pokemonPromise.reason as string,
        } as PokemonError;
      }
    });

    return {
      count: response?.count ?? 0,
      results: responseDetailsPokemons ?? [],
    };
  }

  /**
   * Get all pokemons for live search
   * @private
   *
   */
  private async getAllPokemons(): Promise<PokemonResult[]> {
    const allPokemons: PokemonResult[] = [];
    let offset = 0;
    const limit = 100; // Fetching 100 at a time
    let currentBatch: PokemonResult[] = [];

    do {
      currentBatch = (await this.getListPokemons(offset, limit)).results;
      allPokemons.push(...currentBatch);
      offset += limit;
    } while (currentBatch.length !== 0);

    return allPokemons;
  }

  async searchPokemon(query: string): Promise<Pokemon[]> {
    const allPokemonNames: PokemonResult[] = await this.getAllPokemons();

    // Filter those that match the search
    const matchedPokemonNames = allPokemonNames.filter((pokemon) =>
      pokemon.name.includes(query.toLowerCase()),
    );

    //Get the details for each filtered
    const promisePokemons = matchedPokemonNames.map((pokemon) =>
      this.getPokemonFromURL(pokemon.url),
    );
    const detailsPokemons = await Promise.allSettled(promisePokemons);

    //Filter only successful promises and map the data.
    return detailsPokemons
      .filter((pokemonPromise) => pokemonPromise.status === 'fulfilled')
      .map(
        (pokemonPromise: PromiseFulfilledResult<PokemonDetails>) =>
          ({
            id: pokemonPromise.value.id,
            name: pokemonPromise.value.name,
            frontSprite:
              pokemonPromise.value.sprites.other['official-artwork']
                .front_default,
          }) as Pokemon,
      );
  }
}
