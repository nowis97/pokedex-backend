import { Test, TestingModule } from '@nestjs/testing';
import { PokedexController } from './pokedex.controller';
import { PokedexService } from '../services/pokedex.service';
import {
  mockPokemonDetailsPikachu,
  mockPokemonListResponseDto,
} from '../../mocks/data.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('PokedexController', () => {
  let controller: PokedexController;

  const mockPokedexService = {
    getPokemon: jest.fn(),
    getPokemons: jest.fn(),
    searchPokemon: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokedexController],
      providers: [
        {
          provide: PokedexService,
          useValue: mockPokedexService,
        },
      ],
    }).compile();

    controller = module.get<PokedexController>(PokedexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPokemon(idOrName)', () => {
    it('should call PokedexService.getPokemon with the correct parameter and return its result', async () => {
      const idOrName = 'pikachu';
      mockPokedexService.getPokemon.mockResolvedValue(
        mockPokemonDetailsPikachu,
      );

      const result = await controller.getPokemon(idOrName);

      expect(mockPokedexService.getPokemon).toHaveBeenCalledWith(idOrName);
      expect(result).toEqual(mockPokemonDetailsPikachu);
    });

    it('should throw HttpException 404 if PokedexService.getPokemon throws HttpException', async () => {
      const idOrName = 'unknown';
      const expectedError = new HttpException(
        'Not Found',
        HttpStatus.NOT_FOUND,
      );
      mockPokedexService.getPokemon.mockRejectedValue(expectedError);

      try {
        await controller.getPokemon(idOrName);
      } catch (error) {
        expect(mockPokedexService.getPokemon).toHaveBeenCalledWith(idOrName);
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toEqual(expectedError);
      }
    });
  });

  describe('getPokemons(offset, limit)', () => {
    it('should call PokedexService.getPokemons with correct parameters and return its result', async () => {
      const offset = 0;
      const limit = 20;
      mockPokedexService.getPokemons.mockResolvedValue(
        mockPokemonListResponseDto,
      );

      const result = await controller.getPokemons(offset, limit);

      expect(mockPokedexService.getPokemons).toHaveBeenCalledWith(
        offset,
        limit,
      );
      expect(result).toEqual(mockPokemonListResponseDto);
    });

    it('should throw HttpException if PokedexService.getPokemons throws HttpException', async () => {
      const offset = 0;
      const limit = 20;
      const expectedError = new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      mockPokedexService.getPokemons.mockRejectedValue(expectedError);

      try {
        await controller.getPokemons(offset, limit);
      } catch (error) {
        expect(mockPokedexService.getPokemons).toHaveBeenCalledWith(
          offset,
          limit,
        );
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toEqual(expectedError);
      }
    });
  });
});
