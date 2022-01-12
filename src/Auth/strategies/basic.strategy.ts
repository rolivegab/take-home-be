import { AuthService } from "@/Auth/services/auth.service";
import { User } from "@/User/user.model";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { BasicStrategy as Strategy } from "passport-http";

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateCredentials({
      username,
      password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const { password: _, ...userWithoutPassword } = user.toJSON<User>()

    return userWithoutPassword;
  }
}
