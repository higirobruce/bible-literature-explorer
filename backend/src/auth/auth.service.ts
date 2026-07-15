import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { AuthUser, AuthUserSchema } from './schemas/auth-user.schema';

export interface AuthPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name) private authUserModel: Model<AuthUser>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const normalized = email.toLowerCase().trim();
    const existing = await this.authUserModel.findOne({ email: normalized });
    if (existing) {
      throw new ConflictException('An account with this email already exists.');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.authUserModel.create({ email: normalized, passwordHash });
    return this.signToken(user);
  }

  async login(email: string, password: string) {
    const normalized = email.toLowerCase().trim();
    const user = await this.authUserModel.findOne({ email: normalized });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      throw new UnauthorizedException('Invalid email or password.');
    }
    return this.signToken(user);
  }

  private signToken(user: AuthUser) {
    const payload: AuthPayload = { sub: user._id.toString(), email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user._id.toString(), email: user.email },
    };
  }

  async sso(email: string) {
    const normalized = email.toLowerCase().trim();
    let user = await this.authUserModel.findOne({ email: normalized });
    if (!user) {
      const passwordHash = await bcrypt.hash(randomUUID(), 10);
      user = await this.authUserModel.create({ email: normalized, passwordHash });
    }
    return this.signToken(user);
  }
}
