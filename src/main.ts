import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Task Manager in NEST')
    .setDescription('Curso nest Danielle Leão de gerenciamento de usuário')
    .setVersion('1.0')
    .addTag('Curso Dani')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );

  const PORT = process.env.PORT! || 3000;
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT} 🧪🚀`);
  });
}
bootstrap();
