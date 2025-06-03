import { ApiProperty } from '@nestjs/swagger';

export class PokemonError {
  @ApiProperty({
    description: 'error',
  })
  error: string;
}
