import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Medication } from "./medication.model";

@Table({
  timestamps: true,
  tableName: "medication_details",
  underscored: true,
})
export class MedicationDetail extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  /**
   * @deprecated
   */
  @Column({
    type: DataType.TEXT,
    field: "generic_name",
  })
  genericName: string;

  @Column({
    type: DataType.TEXT,
    field: "uses",
  })
  uses: string;

  @Column({
    type: DataType.TEXT,
    field: "side_effects",
  })
  sideEffects: string;

  @Column({
    type: DataType.TEXT,
    field: "precautions",
  })
  precautions: string;

  @Column({
    type: DataType.TEXT,
    field: "interactions",
  })
  interactions: string;

  @ForeignKey(() => Medication)
  @Column({
    type: DataType.UUID,
    unique: true,
  })
  medicationId: string;

  @BelongsTo(() => Medication)
  medication: Medication;
}
