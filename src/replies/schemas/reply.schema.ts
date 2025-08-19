import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Reply extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Thread', required: true })
  thread: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Reply', default: null })
  parent: Types.ObjectId | null; // reference to another reply
}

export const ReplySchema = SchemaFactory.createForClass(Reply);
