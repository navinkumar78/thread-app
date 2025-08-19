import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reply } from './schemas/reply.schema';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { isValidObjectId } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class RepliesService {
  constructor(@InjectModel(Reply.name) private replyModel: Model<Reply>) {}

async create(threadId: string, userId: string, dto: CreateReplyDto, parentId?: string) {
  if (!Types.ObjectId.isValid(threadId)) {
    throw new BadRequestException('Invalid threadId');
  }

    const validParentId = parentId && parentId !== 'null' && parentId.trim() !== '' 
    ? parentId 
    : undefined;

  if (validParentId && !Types.ObjectId.isValid(validParentId)) {
    throw new BadRequestException('Invalid parentId');
  }

  const reply = new this.replyModel({
    thread: new Types.ObjectId(threadId),
    author: new Types.ObjectId(userId),
    content: dto.content,
    parent: validParentId ? new Types.ObjectId(validParentId) : undefined, // omit if not provided
  });

  return reply.save().then((doc) => doc.populate(['author', 'parent']));
}
  async findAll(threadId: string, parentId?: string) {
    if (!Types.ObjectId.isValid(threadId)) {
      throw new BadRequestException('Invalid threadId');
    }
    const validParentId = parentId && parentId !== 'null' && parentId.trim() !== ''
      ? parentId
      : undefined;
    const filter: any = { thread: new Types.ObjectId(threadId) };
    filter.parent = validParentId ? new Types.ObjectId(validParentId) : null;

    return this.replyModel
      .find(filter)
      .populate('author', 'username')
      .populate('parent');
  }

  async findById(id: string) {
    const reply = await this.replyModel
      .findById(id)
      .populate('author', 'username')
      .populate('parent');

    if (!reply) throw new NotFoundException('Reply not found');
    return reply;
  }

  async update(id: string, dto: UpdateReplyDto) {
    const updated = await this.replyModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Reply not found');
    return (await updated.populate('author', 'username')).populate('parent');
  }

  async remove(id: string) {
    const deleted = await this.replyModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Reply not found');
    return { message: 'Reply deleted' };
  }
}
