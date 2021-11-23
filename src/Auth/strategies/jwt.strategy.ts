import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../config/constants";

export interface IDecodedToken {
  id: string;
  email: string;
}

/**
 * Validates a JWT token attached to a request as a
 * Bearer token
 *
 * Can be re-purposed for all protected endpoints
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * This validate payload is redundant as of now, as it executed
   *  ***after*** the signature on a JWT token has been verified
   * @param payload
   */
  async validate(payload: IDecodedToken) {
    return { id: payload.id, email: payload.email };
  }
}
