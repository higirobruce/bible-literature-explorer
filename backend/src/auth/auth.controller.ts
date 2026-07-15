import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

class AuthDto {
  email: string;
  password: string;
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: AuthDto) {
    if (!body?.email || !body?.password || body.password.length < 6) {
      throw new UnauthorizedException('Email and password (min 6 chars) are required.');
    }
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: AuthDto) {
    if (!body?.email || !body?.password) {
      throw new UnauthorizedException('Email and password are required.');
    }
    return this.authService.login(body.email, body.password);
  }

  @Post('sso')
  sso(@Body() body: { email?: string }) {
    if (!body?.email) {
      throw new UnauthorizedException('Email is required.');
    }
    return this.authService.sso(body.email);
  }
}
