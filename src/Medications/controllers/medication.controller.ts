import { MedicationsFiltersDto } from "@/Medications/dto/medicationsFilters.dto";
import { MedicationDetailEntity } from "@/Medications/entities";
import { MedicationEntity } from "@/Medications/entities/";
import { MedicationService } from "@/Medications/services/medication.service";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Medications")
@Controller("medications")
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Get()
  @ApiQuery({
    name: "zipCode",
    description:
      "If available, filters the medication list by Zip Code and regional rules",
    required: false,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Get all active medications",
    type: MedicationEntity,
  })
  public async findAll(
    @Query() filters?: MedicationsFiltersDto
  ): Promise<MedicationEntity[]> {
    const filterBy = await this.medicationService.getFilters(filters);

    return await this.medicationService.getAllActiveWithFilter(filterBy);
  }

  @Get(":id")
  public async findOne(@Param("id") id: string): Promise<MedicationEntity> {
    return await this.medicationService.getByIdAndActive(id);
  }

  @Get(":id/details")
  @ApiResponse({
    status: 200,
    description: "Get medication details",
    type: MedicationDetailEntity,
  })
  public async findMedicationDetail(@Param("id") id: string) {
    return await this.medicationService.getMedicationDetailById(id);
  }
}
