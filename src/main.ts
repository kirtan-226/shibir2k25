import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS to allow requests from your Amplify domain
  app.enableCors({
    origin: true, // Allows all origins - replace with your specific Amplify domain in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Shibir Backend API')
    .setDescription('API documentation for Shibir Backend')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Shibir Backend API', // This will appear in the browser tab
  });

  await app.listen(4000);
}
bootstrap();
