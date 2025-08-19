import { Module,NestMiddleware,MiddlewareConsumer,NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThreadsModule } from './threads/threads.module';
import { RepliesModule } from './replies/replies.module';
import { LikesModule } from './likes/likes.module';
import { FollowsModule } from './follows/follows.module';

import { FeedModule } from './feed/feed.module';
import { WebsocketModule } from './websocket/websocket.module';

import { DatabaseModule } from './database/database.module';
import { JwtService } from '@nestjs/jwt';
import { Mongoose } from 'mongoose';
import { LoggerMiddleware } from './common/middleware/logger.middleware';



@Module({
  imports: [
    AuthModule,
    UsersModule,
    ThreadsModule,
    RepliesModule,
    LikesModule,
    FollowsModule,

    FeedModule,
    WebsocketModule,

    DatabaseModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
