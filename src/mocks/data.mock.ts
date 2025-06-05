import { PokemonDetails } from '../pokedex/dtos/pokemon-details.dto';
import { PokemonListResponseDTO } from '../pokedex/dtos/pokemon-list.response.dto';

export const mockPokemonDetailsPikachu: PokemonDetails = {
  id: 25,
  name: 'pikachu',
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'pikachu.png',
      },
      showdown: {
        // Added based on previous DTO fixes
        front_default: 'pikachu-showdown.png',
        back_default: 'pikachu-showdown-back.png',
      },
    },
  },
  height: 4,
  weight: 60,
  types: [],
  stats: [],
};

export const mockPokemonListResponseDto: PokemonListResponseDTO = {
  count: 1,
  results: [
    {
      id: 25,
      name: 'pikachu',
      frontSprite: 'pikachu.png',
    },
  ],
};
