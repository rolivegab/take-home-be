import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Mapped to Local Passport strategy
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}
