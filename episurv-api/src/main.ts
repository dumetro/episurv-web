import { config } from 'dotenv';
config();
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

// Load environment variables from .env file
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
    // Apply JwtAuthGuard globally
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  await app.listen(process.env.API_PORT!);
}
bootstrap();
