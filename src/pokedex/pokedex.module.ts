import { Module } from '@nestjs/common';
import { PokedexService } from './services/pokedex.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PokedexController } from './controllers/pokedex.controller';

@Module({
    imports: [HttpModule.registerAsync({
        imports: [ConfigModule.forRoot()],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          timeout: 5000,
          baseURL: configService.getOrThrow<string>('POKE_API_URL'),
        }),
      })],
    providers: [PokedexService],
    controllers: [PokedexController]
})
export class PokedexModule {}
