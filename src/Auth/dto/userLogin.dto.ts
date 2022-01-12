import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserLoginDto {
  @ApiProperty({
    example: "rolivegab",
    description: "Username",
  })
  username!: string;

  @ApiProperty({
    example: "Password!123",
    description: "User password",
  })
  @IsNotEmpty()
  password!: string;
}
