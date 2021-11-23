import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
  @ApiProperty({
    example: "some@email.com",
    description: "User email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "somethingSuperSecret",
    description: "User password",
  })
  @IsNotEmpty()
  password: string;
}
