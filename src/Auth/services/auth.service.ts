import { UserCredentialsDto } from "@/Auth/dto/userSignUp.dto";
import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { AuthUser } from "../interfaces/authUser.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: Logger
  ) {}

  async validateHash(plainPass: string, hashedPass: string) {
    return bcrypt.compare(plainPass, hashedPass);
  }

  async validateEmail(email: string) {
    return true;
  }

  /**
   * Validates a user by comparing a hash vs a password
   */
  async validateCredentials(
    userCredentialsDto: UserCredentialsDto
  ): Promise<AuthUser | void> {
    // TODO: missing implementation
  }

  async verifyPassResetToken(...args): Promise<boolean> {
    // TODO: missing implementation
    return false;
  }

  async invalidateResetToken(token: string) {
    // TODO: missing implementation
  }

  /**
   * Returns user information
   */
  async login(payload: AuthUser) {
    // TODO: missing implementation
  }

  async signUp(userDto: UserCredentialsDto) {
    // TODO: missing implementation
  }

  /**
   * Creates Reset Pass token
   * Valid for 12 hours
   * @param email
   * @param userId
   */
  async createResetToken(email: string, userId: string) {
    // TODO: missing implementation
  }

  /**
   * Resets password
   */
  async resetPassword(email: string, password: string) {
    // TODO: missing implementation
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Signs JWT token
   */
  private async signJwtToken(payload: any) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
