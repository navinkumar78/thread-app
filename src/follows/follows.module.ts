import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { Follow, FollowSchema } from './schemas/follow.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Follow.name, schema: FollowSchema }]), JwtModule],
  providers: [FollowsService],
  controllers: [FollowsController],
  exports: [FollowsService]
})
export class FollowsModule {}
