import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_BEARER_AUTH_NAME } from './constants/common.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const documentOptions = new DocumentBuilder()
    .setTitle('Nestjs Training')
    .setDescription('Nestjs Training by karan')
    .setVersion('v1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      API_BEARER_AUTH_NAME,
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentOptions);

  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'api.json',
    yamlDocumentUrl: 'api.yaml',
    customSiteTitle: documentOptions.info.title,
  });


  await app.listen(3000);

  const logger = new Logger('Main');
  logger.log(`Application started at ${await app.getUrl()}`);
}
bootstrap();
