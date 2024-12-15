import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from '../user.service';
import { AuthenticatedReqeust } from '../../interfaces/authenticatedRequest.interface';
import { Reflector } from '@nestjs/core';
import { IS_PUBLICLY_ACCESSIBLE } from '../decorators/authExempt.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _jwtService: JwtService,
    private _userService: UserService,
    private _reflector: Reflector
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<string>(
      IS_PUBLICLY_ACCESSIBLE,
      [context.getHandler(), context.getClass()]
    );

    if (isPublic) {
      return true;
    }

    const request: AuthenticatedReqeust = context.switchToHttp().getRequest();

    const authToken = this._extractTokenFromHeader(request);

    if (authToken) {
      try {
        const payload = await this._jwtService.verifyAsync(authToken);
        const email: string = payload.email;
        const user = await this._userService.getUserByEmail(email);

        if (!user) {
          return false;
        }
        request.user = user;
        return true;
      } catch {
        return false;
      }
    } else {
      return false;
    }
  }

  private _extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
