import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity({ name: "personas" })
export class Persona {
  @PrimaryGeneratedColumn({ type: "int" })
  persona_id!: number;

  @Column({ nullable: false })
  persona_identifier!: bigint;
}