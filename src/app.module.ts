import { Module } from '@nestjs/common';

import { PokedexModule } from './pokedex/pokedex.module';

@Module({
  imports: [PokedexModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
