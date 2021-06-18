import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ autoCreate: true })
export class Post {
  @Prop({ type: Date, default: Date.now, required: true })
  created_at: Date;

  @Prop({ type: Date })
  updated_at: Date;

  @Prop({ required: true, index: true, unique: true })
  title: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ type: Array, required: true, index: true })
  technologies: [];

  @Prop({ type: Types.ObjectId, required: true, index: true })
  category_id: string;

  @Prop()
  url: string;

  @Prop({ required: true })
  banner_img: string;

  @Prop({ type: Array, required: true, index: true })
  sections: [];
}

export const PostSchema = SchemaFactory.createForClass(Post);
