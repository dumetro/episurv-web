import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('EpiSurv API')
    .setDescription('EpiSurv API documentation for managing epidemiological data')
    .setVersion('1.0')
    .addBearerAuth() // If you're using JWT authentication
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger UI endpoint
  await app.listen(process.env.API_PORT!);
}
bootstrap();
