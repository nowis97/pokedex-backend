import { Module } from '@nestjs/common';
import { PokedexService } from './services/pokedex.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [HttpModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
          timeout: 5000,
          baseURL: configService.get<string>('POKE_API_URL'),
        }),
      })],
    providers: [PokedexService]
})
export class PokedexModule {}
