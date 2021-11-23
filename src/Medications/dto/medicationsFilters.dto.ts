import { IsOptional, IsString } from "class-validator";

export class MedicationsFiltersDto {
  @IsString()
  @IsOptional()
  zipCode?: string;
}
