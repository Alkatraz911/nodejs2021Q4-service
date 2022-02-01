import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Nest JS API documentation')
    .setDescription('REST NestJS API')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)  
  SwaggerModule.setup('/doc', app, document)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
