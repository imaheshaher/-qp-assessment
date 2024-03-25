import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JWTAuthGuard } from './local-auth-guard';

@Injectable()
export class RolesGuard extends JWTAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    if (!requiredRoles) {
      return true;
    }
    const user = request.user; // Assuming user object is set by authentication middleware
    console.log('user: ', user);

    return requiredRoles.some((role) => user.userType === role);
  }
}
