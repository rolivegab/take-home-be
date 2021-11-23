import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { config } from "@/Config/environment";
import { ExternalRequestHeaders } from "@/Config/external-requests";

@Injectable()
export class ExternalTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    return (
      request.headers[ExternalRequestHeaders.EXTERNAL_TOKEN] ===
      config.external.endpointToken
    );
  }
}
