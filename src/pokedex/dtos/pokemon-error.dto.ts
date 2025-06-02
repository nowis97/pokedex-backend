import { ApiProperty } from '@nestjs/swagger';

export class PokemonError {
  @ApiProperty({
    description: 'Null id',
  })
  id: null;
  @ApiProperty({
    description: 'error',
  })
  error: string;
}
