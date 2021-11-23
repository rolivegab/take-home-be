import { MedicationsFiltersDto } from "@/Medications/dto/medicationsFilters.dto";
import {
  MedicationCategory,
  MedicationDetailEntity,
  MedicationEntity,
} from "@/Medications/entities";
import {
  IDrugBankMedicationFilteredResult,
  IDrugQuery,
} from "@/Medications/interfaces";
import { Medication } from "@/Medications/models/medication.model";
import { MedicationDetail } from "@/Medications/models/medicationDetail.model";
import { MedicationSpecification } from "@/Medications/models/medicationSpecification.model";
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Sequelize from "sequelize";

@Injectable()
export class MedicationService {
  constructor(
    private readonly logger: Logger,
    @InjectModel(Medication)
    private readonly medicationModel: typeof Medication,
    @InjectModel(MedicationDetail)
    private readonly medicationDetailModel: typeof MedicationDetail
  ) {}

  public async getByIdAndActive(id: string): Promise<MedicationEntity> {
    try {
      const medication = await this.medicationModel.findOne({
        where: {
          id: { [Sequelize.Op.eq]: id },
          active: { [Sequelize.Op.eq]: true },
        },
        include: [
          {
            model: MedicationSpecification,
            where: {
              active: { [Sequelize.Op.eq]: true },
            },
          },
        ],
      });

      return new MedicationEntity(medication);
    } catch (error) {
      this.logger.error(
        `[getByIdAndActive] error getting medications list`,
        error.stack
      );
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Get all active medications.
   *
   * @param {string?} zipCode
   */
  public async getAllActiveWithFilter(
    filterBy?: Sequelize.WhereOptions<any>
  ): Promise<MedicationEntity[]> {
    try {
      const medications = await this.medicationModel.findAll({
        where: {
          ...filterBy,
          active: true,
        },
      });

      return medications?.map((medication) => new MedicationEntity(medication));
    } catch (error) {
      this.logger.error(
        `[getAllAndActive] error getting medications list`,
        error.stack
      );
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Get one medication by key/value
   *
   * @param {keyof Medication} key
   * @param {string} value
   */
  public async findOneByKeyValue(
    key: keyof Medication,
    value: string
  ): Promise<Medication> {
    try {
      const medication = await this.medicationModel.findOne({
        where: { [key]: { [Sequelize.Op.eq]: value } },
        include: [{ model: MedicationSpecification }],
      });

      if (!medication) {
        throw new NotFoundException(
          `Medication with ${key}:${value} not found.`
        );
      }

      return medication;
    } catch (error) {
      this.logger.error(
        `[findOneByKeyValue] error getting a medication by ${key}:${value}`,
        error.stack
      );
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Get Medication's Detail by Medication Id.
   *
   * @param {string} medicationId
   */
  public async getMedicationDetailById(
    medicationId: string
  ): Promise<MedicationDetailEntity> {
    const medicationDetail = await this.medicationDetailModel.findOne({
      where: {
        medicationId: { [Sequelize.Op.eq]: medicationId },
      },
    });

    if (!medicationDetail) {
      throw new NotFoundException(
        `[getMedicationDetailById] details for medication ${medicationId} not found.`
      );
    }

    return new MedicationDetailEntity(medicationDetail);
  }

  /**
   * Returns medications based on an array of IDs passed
   *
   * @param {string[]} medicationIds
   */
  public async getMedicationsByIds(
    medicationIds: string[]
  ): Promise<MedicationEntity[]> {
    const medications = await this.medicationModel.findAll({
      where: {
        id: { [Sequelize.Op.in]: medicationIds },
      },
      include: [{ model: MedicationSpecification }],
    });

    return medications.map((medication) => new MedicationEntity(medication));
  }

  /**
   *
   * @param {string[]} medicationIds
   * @param {Array<keyof Medication>} attributes
   */
  public async getMedicationsByIdsWithAttributes(
    medicationIds: string[],
    attributes: Array<keyof Medication> = ["id", "brandName", "genericName"]
  ) {
    try {
      return await this.medicationModel.findAll({
        where: {
          id: { [Sequelize.Op.in]: medicationIds },
        },
        attributes,
      });
    } catch (error) {
      this.logger.error(
        `[getMedicationsByIdsWithAttributes] error fetching medication with attributes`,
        error.stack
      );
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Build filters for Sequelize based on criteria defined by business rules
   *
   * @param {MedicationsFiltersDto} filters
   */
  public async getFilters(
    filters: MedicationsFiltersDto
  ): Promise<Sequelize.WhereOptions<any>> {
    const filterBy: Sequelize.WhereOptions<any> = {};

    if (filters.zipCode) {
      // Check if Med is enabled by zip code
      const isStateEnabled = true;

      if (isStateEnabled) {
        filterBy.subCategory = {
          [Sequelize.Op.ne]: MedicationCategory.CONTROLLED,
        };
      }
    }

    return filterBy;
  }
}
