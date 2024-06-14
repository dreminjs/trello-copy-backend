import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
          .setTitle('Trello copy')
          .setDescription('The Trello copy API description')
          .setVersion('1.0')
          .addTag('cats')
          .addBearerAuth(
            { 
              // I was also testing it without prefix 'Bearer ' before the JWT
              description: `[just text field] Please enter token in following format: Bearer <JWT>`,
              name: 'Authorization',
              bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
              scheme: 'Bearer',
              type: 'http', // I`ve attempted type: 'apiKey' too
              in: 'Header'
            },
            'token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
          )
          .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
