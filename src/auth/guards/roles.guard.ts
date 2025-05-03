import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // If no roles are required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // Extract user from the request

    if (!user || !user.roles) {
      throw new ForbiddenException('You do not have permission to access this resource!!');
    }

    // Check if any of the user's roles match the required roles
    const hasRole = user.roles.some(role => requiredRoles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions to access this resource!!');
    }

    return true;
  }
}
