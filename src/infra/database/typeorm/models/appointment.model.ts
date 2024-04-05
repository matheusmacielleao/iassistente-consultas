import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import type {
  Appointment,
  Prescription,
} from "../../../../core/domain/entities/appointment";
import type { Patient } from "../../../../core/domain/entities/patient";
import { PatientModel } from "./patient.model";

@Entity()
export class AppointmentModel implements Appointment {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column()
  date!: Date;
  @ManyToOne(() => PatientModel, (patient) => patient.appointments)
  patient!: Patient;
  @OneToMany(() => NotesModel, (note) => note.appointment, {
    cascade: true,
    eager: true,
  })
  notes!: NotesModel[];
  @OneToMany(
    () => PrescriptionModel,
    (prescription) => prescription.appointment,
    { cascade: true, eager: true }
  )
  prescriptions!: Prescription[];
}

@Entity()
export class NotesModel {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  note!: string;
  @ManyToOne(() => AppointmentModel, (appointment) => appointment.notes)
  appointment!: AppointmentModel;
}

@Entity()
export class PrescriptionModel implements Prescription {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  medicine!: string;
  @Column()
  dosage!: string;
  @Column()
  frequency!: string;
  @Column()
  initAt!: Date;
  @Column()
  endAt!: Date;
  @ManyToOne(() => AppointmentModel, (appointment) => appointment.prescriptions)
  appointment!: AppointmentModel;
}
