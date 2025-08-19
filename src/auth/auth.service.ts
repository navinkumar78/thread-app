import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<string> {
  const hashedPassword = await bcrypt.hash(registerDto.password, 10);
  const newUser = new this.userModel({
    ...registerDto,
    password: hashedPassword,
  });
  await newUser.save();
  const payload = { username: newUser.username, sub: newUser._id };
  return this.jwtService.sign(payload); // return token only
}

async login(loginDto: LoginDto): Promise<string> {
  const user = await this.userModel.findOne({ email: loginDto.email });
  if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
    throw new UnauthorizedException('Invalid credentials');
  }
  const payload = { username: user.username, sub: user._id };
  return this.jwtService.sign(payload); // return token only
}
}
