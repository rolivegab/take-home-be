import { config } from "@/Config/environment";
import { AuthUser } from "../interfaces/authUser.interface";

export const jwtConstants = {
  secret: config.jwt.secret,
  tokenDuration: config.jwt.tokenDuration,
};

export interface AuthRequest {
  user: AuthUser;
}
