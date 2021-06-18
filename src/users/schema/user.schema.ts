import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../roles/role.enum';

@Schema()
class Register {
  @Prop({ default: false })
  confirmed?: boolean;

  @Prop({ type: Date })
  date?: Date;

  @Prop()
  code?: string;
}

@Schema()
class Restore {
  @Prop({ default: false })
  requested?: boolean;

  @Prop({ type: Date })
  date?: Date;

  @Prop()
  code?: string;
}

export type UserDocument = User & Document;

@Schema({ autoCreate: true })
export class User {
  @Prop({ type: Date, default: Date.now(), required: true })
  created_at: Date;

  @Prop({ type: Date })
  updated_at: Date;

  @Prop({ required: true, index: true, unique: true })
  mail: string;

  @Prop({ required: true })
  pass: string;

  @Prop({ required: true })
  name: string;

  @Prop([String])
  roles: Role[];

  @Prop({ type: Date })
  connected_at: Date;

  @Prop({ type: Register })
  register: Register;

  @Prop({ type: Restore })
  restore: Restore;
}

export const UserSchema = SchemaFactory.createForClass(User);
