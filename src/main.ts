import { ConfigModule } from './config/config.module';
import { Document } from 'mongoose';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
//import * as cookieParser from 'cookie-parser';  // <-- note the '* as' syntax
const cookieParser = require('cookie-parser'); // ✅ use require


 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor(), new TimeoutInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Insta Threads API')
    .setDescription('API documentation for the Insta Threads application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
  console.log("http://localhost:" + (process.env.PORT ?? 3000));
    console.log(`API documentation available at http://localhost:${process.env.PORT ?? 3000}/api`);

}
void bootstrap();
