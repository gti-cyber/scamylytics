import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // Correct import

import { AppModule } from './app.module';

async function bootstrap()
{
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Scamalytics API')
    .setDescription('API for Scamalytics integration')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0', function ()
  {
    console.log('Server started.......');
  });
}

bootstrap();