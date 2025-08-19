import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  targetId: Types.ObjectId;

  @Prop({ required: true, enum: ['thread', 'reply'] })
  targetType: 'thread' | 'reply';
}

export const LikeSchema = SchemaFactory.createForClass(Like);

// Prevent duplicates
LikeSchema.index({ user: 1, targetId: 1, targetType: 1 }, { unique: true });
