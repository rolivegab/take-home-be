import { ApiProperty } from "@nestjs/swagger";

export class zipCodeDto {
  @ApiProperty({
    example: '10001',
    description: 'zip code for the logged user'
  })
  zipCode!: string
}