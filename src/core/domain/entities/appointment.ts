import { Patient } from "./patient";

export interface Appointment {
  id: string;
  date: Date;
  patient: Patient;
  notes: Notes[];
  prescriptions: Prescription[];
}

interface Notes {
  id: number; // primary key editavel por causa da possibildade de mudar
  note: string;
}

interface Prescription {
  id: number;
  medicine: string;
  dosage: string;
  frequency: string;
  initAt: Date;
  endAt: Date;
}
