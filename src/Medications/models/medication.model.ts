import {
  Column,
  Model,
  Table,
  DataType,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import { MedicationCategory } from "../entities";
import { MedicationDetail } from "./medicationDetail.model";
import { MedicationSpecification } from "./medicationSpecification.model";

@Table({
  timestamps: true,
  tableName: "medications",
  underscored: true,
  paranoid: true,
})
export class Medication extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  brandName: string;

  /**
   * @deprecated
   */
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  slug: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  genericName: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  active: boolean;

  /**
   * @deprecated
   */
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  comingSoon: boolean;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 500,
  })
  price: number;

  /**
   * @deprecated
   */
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  promotionalPrice: number;

  @Column({
    type: DataType.STRING,
  })
  specialConsiderations: string;

  @Column({
    type: DataType.STRING,
  })
  category: string;

  @Column({
    type: DataType.STRING,
  })
  usualRx: string;

  @Column({
    type: DataType.STRING,
  })
  fdaIndications: string;

  @Column({
    type: DataType.STRING,
  })
  schedule: string;

  @Column({
    type: DataType.INTEGER,
  })
  supply: number;

  @Column({
    type: DataType.STRING,
  })
  frequencies: string;

  /**
   * @deprecated
   */
  @Column({
    type: DataType.STRING,
  })
  dosages: string;

  /**
   * @deprecated
   */
  @Column({
    type: DataType.STRING,
  })
  frequency: string;

  /**
   * @deprecated
   */
  @Column({
    type: DataType.STRING,
  })
  format: string;

  /**
   * When this attribute is true, the patient should schedule a visit
   * to be interviewed with someone from the clinical team
   */
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  visitRequired: boolean;

  @Column({
    type: DataType.STRING,
  })
  drugBankId: string;

  @Column({
    type: DataType.ENUM(
      MedicationCategory.CONTROLLED,
      MedicationCategory.NON_CONTROLLED
    ),
    allowNull: false,
    defaultValue: MedicationCategory.NON_CONTROLLED,
  })
  subCategory: MedicationCategory;

  @HasOne(() => MedicationDetail)
  details: MedicationDetail;

  @HasMany(() => MedicationSpecification)
  specifications: MedicationSpecification[];
}
