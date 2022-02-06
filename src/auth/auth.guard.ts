import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const [type, token] = authorization.split(' ');
        if (token) {
          if (type !== 'Bearer') {
            throw new UnauthorizedException({ message: 'Unathorized' });
          } else {
            const user = this.jwtService.verify(token, {
              secret: process.env.JWT_SECRET,
            });
            req.user = user;
            return true;
          }
        }
      } else {
        throw new UnauthorizedException({ message: 'Unathorized' });
      }
    } catch (e) {
      throw new UnauthorizedException({ message: 'Unathorized' });
    }
  }
}
