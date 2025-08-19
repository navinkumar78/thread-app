import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Thread, ThreadSchema } from './schemas/thread.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Thread.name, schema: ThreadSchema }])],
  controllers: [ThreadsController],
  providers: [ThreadsService, JwtService],
  exports: [ThreadsService]
})
export class ThreadsModule {}
