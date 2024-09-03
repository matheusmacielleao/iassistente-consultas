import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import type { Patient } from "../../../../core/domain/entities/patient";
import { AppointmentModel } from "./appointment.model";

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
  @OneToMany(() => AppointmentModel, (appointment) => appointment.patient)
  appointments!: AppointmentModel[];
}
