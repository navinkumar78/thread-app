import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('No token found in header or cookie');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'default_secret_key', // make sure this matches your .env or config
      });
      request['user'] = payload; // Attach decoded token payload to request
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    // 1. Try Authorization header (Bearer token)
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
      return token;
    }

    // 2. Try HttpOnly cookie (for browser-based auth)
    if (request.cookies && request.cookies.jwt) {
      return request.cookies.jwt;
    }

    return undefined;
  }
}
