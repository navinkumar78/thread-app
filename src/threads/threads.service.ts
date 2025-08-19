import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Thread } from './schemas/thread.schema';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';

@Injectable()
export class ThreadsService {
  constructor(@InjectModel(Thread.name) private threadModel: Model<Thread>) {}

  
   async create(authorId: string, dto: CreateThreadDto) {
    return this.threadModel.create({ ...dto, author: authorId });
  }

  async findAll() {
    return this.threadModel.find().populate('author', 'username email').sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const thread = await this.threadModel.findById(id).populate('author', 'username email');
    if (!thread) throw new NotFoundException('Thread not found');
    return thread;
  }

  async update(id: string, authorId: string, dto: UpdateThreadDto) {
    const thread = await this.threadModel.findById(id);
    //console.log(thread);
    if (!thread) throw new NotFoundException('Thread not found');
    if (thread.author.toString() !== authorId) throw new ForbiddenException('Not your thread');
    Object.assign(thread, dto);
    return thread.save();
  }

  async remove(id: string, authorId: string) {
    const thread = await this.threadModel.findById(id);
    console.log(JSON.stringify(thread));
    if (!thread) throw new NotFoundException('Thread not found');
    if (thread.author.toString() !== authorId) throw new ForbiddenException('Not your thread');
    await thread.deleteOne();
    return { message: 'Thread deleted' };
  }

async findByAuthors(authors: string[], skip: number, limit: number) {
  return this.threadModel
    .find({ author: { $in: authors } })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'username avatar');
}

async countByAuthors(authors: string[]) {
  return this.threadModel.countDocuments({ author: { $in: authors } });
}

async findTrending(skip: number, limit: number) {
  return this.threadModel
    .aggregate([
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'targetId',
          as: 'likes',
        },
      },
      {
        $addFields: { likeCount: { $size: '$likes' } },
      },
      { $sort: { likeCount: -1, createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);
}

async countAll() {
  return this.threadModel.countDocuments();
}


}
