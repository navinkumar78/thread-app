import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { Like, LikeSchema } from './schemas/like.schema';
import { AuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt'; // <- import this
import { JwtService } from '@nestjs/jwt'; // <- import this

@Module({
  imports: [MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]), JwtModule],
  controllers: [LikesController],
  providers: [LikesService, JwtService],
  exports: [LikesService]
})
export class LikesModule {}