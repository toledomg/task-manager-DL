import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

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
