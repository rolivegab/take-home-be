import { UserSignUpDto } from "@/Auth/dto/userSignUp.dto";
import { UserService } from "@/User/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import assert from "assert";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) { }

  async validateHash(plainPass: string, hashedPass: string) {
    return bcrypt.compare(plainPass, hashedPass);
  }

  async validateCredentials(
    { username, password }: { username: string; password: string }
  ) {
    const user = await this.userService.findOne(username)
    assert(user, new UnauthorizedException())
    if (await this.validateHash(password, user.password)) {
      return user
    } else {
      throw new UnauthorizedException()
    }
  }

  async signUp({ password, ...userSignUpDtoWithoutPassword }: UserSignUpDto) {
    const userCreateInput = { ...userSignUpDtoWithoutPassword, password: await this.hashPassword(password) }
    return this.userService.createOne(userCreateInput)
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
