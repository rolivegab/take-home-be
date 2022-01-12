import {
  Column,
  Model,
  Table,
  DataType,
  Unique,
} from "sequelize-typescript";

export type UserCreateInput = Pick<User, 'username' | 'password' | 'zipCode'>

@Table({
  timestamps: true,
  underscored: true
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  zipCode!: string;
}
