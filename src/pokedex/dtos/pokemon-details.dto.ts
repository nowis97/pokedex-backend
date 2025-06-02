import { ApiProperty } from '@nestjs/swagger';

class Type {
  @ApiProperty({
    description: 'Name of type',
  })
  name: string;
  url: string;
}

class Other {
  @ApiProperty({
    description: 'Image artwork',
    type: 'object',
    properties: {
      front_default: { type: 'string' },
    },
  })
  'official-artwork': {
    front_default: string;
  };

  @ApiProperty({
    description: 'Front and back images',
    properties: {
      front_default: { type: 'string' },
      back_default: { type: 'string' },
    },
  })
  showdown: {
    back_default: string;
    front_default: string;
  };
}

class Stats {
  @ApiProperty({ description: 'Base stat' })
  base_stat: number;

  @ApiProperty({ description: 'Base stat' })
  effort: number;

  @ApiProperty({
    description: 'stat',
    type: 'object',
    properties: { name: { type: 'string' } },
  })
  stat: { name: string };
}

class Sprites {
  @ApiProperty({
    description: 'Other sprites',
    type: Other,
  })
  other: Other;
}

export class PokemonDetails {
  @ApiProperty({ description: 'Pokemon ID' })
  id: number;

  @ApiProperty({ description: 'Pokemon name' })
  name: string;

  @ApiProperty({ description: 'Pokemon description' })
  sprites: Sprites;

  @ApiProperty({
    description: 'Pokemon height',
  })
  height: number;

  @ApiProperty({
    description: 'Pokemon weight',
  })
  weight: number;

  @ApiProperty({
    description: 'Pokemon types',
    isArray: true,
    type: Type,
  })
  types: Type[];

  @ApiProperty({
    description: 'Pokemon stats',
    isArray: true,
    type: Stats,
  })
  stats: Stats[];
}
