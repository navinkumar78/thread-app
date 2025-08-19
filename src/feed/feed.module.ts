import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { ThreadsModule } from '../threads/threads.module';
import { FollowsModule } from '../follows/follows.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ThreadsModule, FollowsModule],
  providers: [FeedService, JwtService],
  controllers: [FeedController],
})
export class FeedModule {}
