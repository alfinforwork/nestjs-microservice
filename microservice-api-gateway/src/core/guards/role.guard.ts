import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JsonError } from "src/helpers/main.helper";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(roles, user.role);
    if (!roles || !user.role) {
      throw new ForbiddenException(JsonError("Role not found"));
    }
    if (!roles.includes(user.role)) {
      throw new ForbiddenException(JsonError("You cannot access this api"));
    }
    return true;
  }
}
