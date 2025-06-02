import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('Pokedex API')
    .setDescription('Pokedex API')
    .setVersion('1.0')
    .build();

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, configSwagger),
  );

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server started on ${await app.getUrl()}`);
}
bootstrap();
