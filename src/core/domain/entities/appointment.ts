import type { Patient } from "./patient";

export interface Appointment {
  id?: string;
  date: Date;
  patient: Patient;
  notes: Notes[];
  prescriptions: Prescription[];
}

export interface CreateAppointmentDto {
  date: Date;
  patientCpf: string;
  notes: string[];
  prescriptions: Prescription[];
}

export interface Notes {
  id: number; // primary key editavel por causa da possibildade de mudar
  note: string;
}

export interface Prescription {
  id: number;
  medicine: string;
  dosage: string;
  frequency: string;
  initAt: Date;
  endAt: Date;
}
