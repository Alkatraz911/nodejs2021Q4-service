import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpExceptionFilter } from './helpers/exeptionFilter'


async function bootstrap() {
  let app;
  let mode;
  if (process.env.USE_FASTIFY === 'true') {
    mode = 'fastify'
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
  } else {
    mode = 'express'
    app = await NestFactory.create(AppModule);
  }

  const config = new DocumentBuilder()
    .setTitle('Nest JS API documentation')
    .setDescription('REST NestJS API')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)  
  SwaggerModule.setup('/doc', app, document)
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(process.env.PORT, '0.0.0.0', ()=>{
    console.log(`App is running at ${process.env.PORT} port. App mode ${mode}`)
  });
}
bootstrap();
