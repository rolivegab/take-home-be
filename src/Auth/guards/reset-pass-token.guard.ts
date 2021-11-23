import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";

@Injectable()
export class ResetPassTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.query.email && request.query.tokenString;
  }
}
