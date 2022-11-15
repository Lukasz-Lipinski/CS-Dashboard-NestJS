import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
