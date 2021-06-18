import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schema/user.schema';
import { MailService } from './mail.service';

const MIN_CODE = 10000;
const MAX_CODE = 99999;

function codeGen(min_code: number, max_code: number): number {
  const min = Math.ceil(min_code);
  const max = Math.floor(max_code);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const same_pass = await bcrypt.compare(pass, user.pass);
      if (same_pass) {
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.mail, sub: user._id, roles: user.roles };

    await this.userModel.updateOne(
      { _id: user._id },
      { $set: { connected_at: new Date() } },
    );

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const saltRounds = 10;
    const code = codeGen(MIN_CODE, MAX_CODE).toString();
    const hashCode = await bcrypt.hash(code, saltRounds);

    await this.userModel.updateOne(
      { _id: user._id },
      { $set: { register: { date: new Date(), code: hashCode } } },
    );

    const response = await this.mailService.send(
      'Regiter New User',
      user.mail,
      'Registering New User',
      code,
    );

    return response;
  }

  async restore(user: any) {
    const saltRounds = 10;
    const code = codeGen(MIN_CODE, MAX_CODE).toString();
    const hashCode = await bcrypt.hash(code, saltRounds);

    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          restore: { requested: true, date: new Date(), code: hashCode },
        },
      },
    );

    const response = await this.mailService.send(
      'Restore User Password',
      user.mail,
      'Restoring User Password',
      code,
    );

    return response;
  }
}
