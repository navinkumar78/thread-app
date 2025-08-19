import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like, LikeDocument } from './schemas/like.schema';
import { CreateLikeDto } from './dto/create-like.dto';
import { UnlikeDto } from './dto/unlike.dto';

@Injectable()
export class LikesService {
  constructor(@InjectModel(Like.name) private readonly likeModel: Model<LikeDocument>) {}

  private toObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid ObjectId: ' + id);
    return new Types.ObjectId(id);
  }

  async like(dto: CreateLikeDto, userId: string) {
    const doc = { user: this.toObjectId(userId), targetId: this.toObjectId(dto.targetId), targetType: dto.targetType };
    await this.likeModel.updateOne(doc, { $setOnInsert: doc }, { upsert: true });
    return { status: 'liked', targetId: dto.targetId, targetType: dto.targetType };
  }

  async unlike(dto: UnlikeDto, userId: string) {
    await this.likeModel.deleteOne({ user: this.toObjectId(userId), targetId: this.toObjectId(dto.targetId), targetType: dto.targetType });
    return { status: 'unliked', targetId: dto.targetId, targetType: dto.targetType };
  }

  async count(targetType: 'thread' | 'reply', targetId: string) {
    const n = await this.likeModel.countDocuments({ targetType, targetId: this.toObjectId(targetId) });
    return { targetType, targetId, count: n };
  }

  async isLikedByUser(targetType: 'thread' | 'reply', targetId: string, userId: string) {
    const exists = await this.likeModel.exists({ targetType, targetId: this.toObjectId(targetId), user: this.toObjectId(userId) });
    return { targetType, targetId, liked: !!exists };
  }
}
