import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";

@Entity({ name: "administrators" })
export class Admin {
    @PrimaryGeneratedColumn({ type: "int" })
    admin_id!: number;

    @Column({ nullable: false })
    username!: string;
}