import { Test, TestingModule } from '@nestjs/testing';
import { PokedexService } from './pokedex.service';
import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';
import { PokemonDetails } from '../dtos/pokemon-details.dto';
import { mockPokemonDetailsPikachu } from '../../mocks/data.mock';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { HttpException } from '@nestjs/common';

describe('PokedexService', () => {
  let service: PokedexService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokedexService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokedexService>(PokedexService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPokemon', () => {
    it('should return PokemonDetails on successful API call', async () => {
      const pokemonIdOrName = 'pikachu';
      const axiosResponse: AxiosResponse<PokemonDetails> = {
        data: mockPokemonDetailsPikachu,
        status: 200,
        statusText: 'OK',
        headers: {},
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        config: { headers: '' } as any,
      };
      (httpService.get as jest.Mock).mockReturnValueOnce(of(axiosResponse));

      const result = await service.getPokemon(pokemonIdOrName);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(httpService.get).toHaveBeenCalledWith(
        `/pokemon/${pokemonIdOrName}`,
      );
      expect(result).toEqual(mockPokemonDetailsPikachu);
    });

    it('should throw HttpException when API returns 404', async () => {
      const pokemonIdOrName = 'unknownpokemon';
      const error: AxiosError = {
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Request failed with status code 404',
        response: {
          data: 'Not Found',
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config: { headers: new AxiosHeaders({}) },
        },
        config: { headers: new AxiosHeaders({}) },
        toJSON: () => ({}),
      };
      (httpService.get as jest.Mock).mockReturnValueOnce(
        throwError(() => error),
      );

      await expect(service.getPokemon(pokemonIdOrName)).rejects.toThrow(
        new HttpException('Request failed with status code 404', 404),
      );
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(httpService.get).toHaveBeenCalledWith(
        `/pokemon/${pokemonIdOrName}`,
      );
    });

    it('should throw HttpException on other API errors', async () => {
      const pokemonIdOrName = 'pikachu';
      const error: AxiosError = {
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Request failed with status code 500',
        response: {
          data: 'Internal Server Error',
          status: 500,
          statusText: 'Internal Server Error',
          headers: {},
          config: { headers: new AxiosHeaders({}) },
        },
        config: { headers: new AxiosHeaders({}) },
        toJSON: () => ({}),
      };
      (httpService.get as jest.Mock).mockReturnValueOnce(
        throwError(() => error),
      );

      await expect(service.getPokemon(pokemonIdOrName)).rejects.toThrow(
        new HttpException('Request failed with status code 500', 500),
      );
    });
  });
});
