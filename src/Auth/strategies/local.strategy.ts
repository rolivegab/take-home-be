import { AuthUser } from "@/Auth/interfaces/authUser.interface";
import { AuthService } from "@/Auth/services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: "email" });
  }

  /**
   * Validates that a username and password submitted to log in are valid
   * @param username
   * @param password
   */
  async validate(username: string, password: string): Promise<AuthUser> {
    const user = await this.authService.validateCredentials({
      email: username,
      password: password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
