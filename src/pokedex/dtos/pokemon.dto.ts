import { ApiProperty } from '@nestjs/swagger';

export class Pokemon {
  @ApiProperty({ description: 'Pokemon ID' })
  id: number;

  @ApiProperty({ description: 'Pokemon name' })
  name: string;

  @ApiProperty({ description: 'Pokemon front image' })
  frontSprite: string;
}
