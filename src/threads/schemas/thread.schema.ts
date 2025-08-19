import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema({ timestamps: true })
export class Thread extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: [{ type: String }] })
  media?: string[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: Types.ObjectId;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
