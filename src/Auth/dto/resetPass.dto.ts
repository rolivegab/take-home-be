import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPassDto {
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

  @ApiProperty({
    example: "abcde",
    description: "Revalidate Password token string",
  })
  @IsNotEmpty()
  tokenString: string;
}
