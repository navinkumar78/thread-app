import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Follow, FollowDocument } from './schemas/follow.schema';
import { FollowDto } from './dto/follow.dto';

@Injectable()
export class FollowsService {
  constructor(@InjectModel(Follow.name) private readonly followModel: Model<FollowDocument>) {}

  private toObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid ObjectId: ' + id);
    return new Types.ObjectId(id);
  }

  async follow(userId: string, dto: FollowDto) {
    const doc = { follower: this.toObjectId(userId), following: this.toObjectId(dto.followingId) };
    if (userId === dto.followingId) throw new BadRequestException("Cannot follow yourself");
    await this.followModel.updateOne(doc, { $setOnInsert: doc }, { upsert: true });
    return { status: 'followed', followingId: dto.followingId };
  }

  async unfollow(userId: string, dto: FollowDto) {
    await this.followModel.deleteOne({ follower: this.toObjectId(userId), following: this.toObjectId(dto.followingId) });
    return { status: 'unfollowed', followingId: dto.followingId };
  }

  async listFollowers(userId: string) {
    return this.followModel
      .find({ following: this.toObjectId(userId) })
      .populate('follower', '_id username avatar');
  }

  async listFollowing(userId: string) {
    return this.followModel
      .find({ follower: this.toObjectId(userId) })
      .populate('following', '_id username avatar');
  }
}
