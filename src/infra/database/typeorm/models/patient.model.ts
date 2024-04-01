import { Column, Entity, PrimaryColumn } from "typeorm";
import type {
  CreatePatientDto,
  Patient,
} from "../../../../core/domain/entities/patient";

@Entity()
export class PatientModel implements Patient {
  @PrimaryColumn()
  cpf!: string;
  @Column()
  name!: string;
  @Column()
  birthDate!: Date;
  @Column()
  gender!: string;
  @Column()
  profission!: string;
  @Column("simple-array")
  allergies!: string[];
  @Column("simple-array")
  comorbidities!: string[];
  @Column("simple-array")
  continuosMedications!: string[];
}
