import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MedicationFormat, MedicationSpecificationEntity } from "../entities";
import Sequelize from "sequelize";
import { MedicationSpecification } from "../models/medicationSpecification.model";

@Injectable()
export class MedicationSpecificationService {
  constructor(
    private logger: Logger,
    @InjectModel(MedicationSpecification)
    private readonly medicationSpecificationModel: typeof MedicationSpecification
  ) {}

  /**
   * Find a medication specification record by medication id, dosage and format.
   *
   * @param medicationId string
   * @param dosage string | number
   * @param format string | MedicationFormat
   * @returns Promise<MedicationSpecificationEntity>
   */
  public async findOneByPrescriptionDetails(
    medicationId: string,
    dosage: number,
    format: string | MedicationFormat
  ): Promise<MedicationSpecificationEntity> | null {
    try {
      const medicationSpec = await this.medicationSpecificationModel.findOne({
        where: {
          medicationId: { [Sequelize.Op.eq]: medicationId },
          dosage: { [Sequelize.Op.eq]: dosage || null },
          format: { [Sequelize.Op.eq]: format },
        },
      });

      if (!medicationSpec) {
        return null;
      }

      return new MedicationSpecificationEntity(medicationSpec);
    } catch (error) {
      this.logger.error(
        `[findOneByPrescriptionDetails] error getting medication specification`,
        error.stack
      );
      throw new InternalServerErrorException(error);
    }
  }
}
