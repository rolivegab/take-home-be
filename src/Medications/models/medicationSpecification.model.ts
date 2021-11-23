import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { MedicationFormat } from "../entities";
import { Medication } from "./medication.model";

const UNIQUE_KEY = "unique_idx__medication_dosage_format";

@Table({
  timestamps: true,
  tableName: "medication_specifications",
  underscored: true,
  paranoid: true,
})
export class MedicationSpecification extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(11),
    unique: "unique_idx__medication_ndc",
  })
  ndc?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: UNIQUE_KEY,
  })
  dosage: number;

  @Column({
    type: DataType.ENUM(MedicationFormat.TABLET, MedicationFormat.CAPSULE),
    allowNull: false,
    unique: UNIQUE_KEY,
  })
  format: MedicationFormat;

  @ForeignKey(() => Medication)
  @Column({
    type: DataType.UUID,
    unique: UNIQUE_KEY,
  })
  medicationId: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  active: boolean;

  @BelongsTo(() => Medication)
  medication: Medication;
}
